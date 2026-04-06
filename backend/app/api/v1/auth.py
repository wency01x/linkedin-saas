from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.core.config import settings
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from svix.webhooks import Webhook
import json

router = APIRouter()

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
        existing_user = db.query(User).filter(
            User.id == data.get("id")
        ).first()

        if existing_user:
            return {"message": "User already exists"}

        email = data.get("email_addresses", [{}])[0].get("email_address")

        new_user = User(
            id=data.get("id"),
            email=email,
            full_name=f"{data.get('first_name', '')} {data.get('last_name', '')}".strip()
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"message": "User created successfully"}

    return {"message": "Event received"}


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_data.get("sub")
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user