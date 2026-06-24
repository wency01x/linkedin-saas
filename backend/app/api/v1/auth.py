from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import httpx

from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.core.config import settings
from app.models.user import User
from app.schemas.user import UserResponse
from svix.webhooks import Webhook

router = APIRouter()


# ---------------------------------------------------------------------------
# Helper — get or create a user row from Clerk data
# ---------------------------------------------------------------------------

async def get_or_create_user(user_id: str, db: Session) -> User | None:
    """
    Look up the user in the DB.  If not found, fetch from Clerk and insert.
    Handles the race-condition / duplicate-key case gracefully by re-querying
    after an IntegrityError so we always return the existing row.
    """
    # 1. Check local DB first
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        return user

    # 2. Fetch from Clerk
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.clerk.com/v1/users/{user_id}",
            headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
        )

    if response.status_code != 200:
        print(f"[auth] Clerk returned {response.status_code} for user {user_id}: {response.text}")
        # Fallback if Clerk API fails (e.g. wrong secret key or network error)
        email = f"{user_id}@placeholder.com"
        full_name = "User"
    else:
        data = response.json()
        # Safely extract email
        email_list = data.get("email_addresses", [])
        email = (
            email_list[0].get("email_address", f"{user_id}@placeholder.com")
            if email_list
            else f"{user_id}@placeholder.com"
        )
        # Safely extract full name
        first = data.get("first_name") or ""
        last = data.get("last_name") or ""
        full_name = f"{first} {last}".strip() or "User"

    # 3. Insert — handle duplicate gracefully
    try:
        new_user = User(id=user_id, email=email, full_name=full_name)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        # Another request beat us to it — roll back and return existing row
        db.rollback()
        return db.query(User).filter(User.id == user_id).first()


# ---------------------------------------------------------------------------
# Clerk Webhook  (user.created / user.deleted)
# ---------------------------------------------------------------------------

@router.post("/webhook/clerk", status_code=200)
async def clerk_webhook(
    request: Request,
    db: Session = Depends(get_db),
    svix_id: str = Header(None),
    svix_timestamp: str = Header(None),
    svix_signature: str = Header(None),
):
    payload = await request.body()

    try:
        wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
        event = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        })
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    event_type = event.get("type")
    data = event.get("data", {})

    if event_type == "user.created":
        user_id = data.get("id")

        # Idempotent — skip if already exists
        if db.query(User).filter(User.id == user_id).first():
            return {"message": "User already exists"}

        email_list = data.get("email_addresses", [])
        email = email_list[0].get("email_address") if email_list else f"{user_id}@placeholder.com"

        first = data.get("first_name") or ""
        last = data.get("last_name") or ""
        full_name = f"{first} {last}".strip() or "User"

        try:
            new_user = User(id=user_id, email=email, full_name=full_name)
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            print(f"[webhook] Created user {user_id} ({email})")
        except IntegrityError:
            db.rollback()
            print(f"[webhook] User {user_id} already existed (race condition), skipped")

        return {"message": "User created"}

    return {"message": "Event received"}


# ---------------------------------------------------------------------------
# GET /me  — returns the current authenticated user (creating if needed)
# ---------------------------------------------------------------------------

@router.get("/me", response_model=UserResponse)
async def get_current_user(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db),
):
    user_id = user_data.get("sub")

    user = await get_or_create_user(user_id, db)

    if not user:
        raise HTTPException(status_code=404, detail="User not found in Clerk")

    return user