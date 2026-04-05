from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.core.config import settings
from app.models.linkedin_account import LinkedInAccount
from app.services.linkedin_api import get_linkedin_profile
import httpx
import uuid

router = APIRouter()

LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"
LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
LINKEDIN_SCOPES = "openid profile email w_member_social"


@router.get("/connect")
async def connect_linkedin(
    user_data: dict = Depends(verify_clerk_token)
):
    if settings.LINKEDIN_CLIENT_ID == "placeholder":
        raise HTTPException(
            status_code=503,
            detail="LinkedIn integration not configured yet"
        )

    auth_url = (
        f"{LINKEDIN_AUTH_URL}"
        f"?response_type=code"
        f"&client_id={settings.LINKEDIN_CLIENT_ID}"
        f"&redirect_uri={settings.LINKEDIN_REDIRECT_URI}"
        f"&scope={LINKEDIN_SCOPES}"
        f"&state={user_data.get('sub')}"
    )

    return RedirectResponse(url=auth_url)


@router.get("/callback")
async def linkedin_callback(
    code: str,
    state: str,
    db: Session = Depends(get_db)
):
    if settings.LINKEDIN_CLIENT_ID == "placeholder":
        raise HTTPException(
            status_code=503,
            detail="LinkedIn integration not configured yet"
        )

    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            LINKEDIN_TOKEN_URL,
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
                "client_id": settings.LINKEDIN_CLIENT_ID,
                "client_secret": settings.LINKEDIN_CLIENT_SECRET,
            }
        )

    if token_response.status_code != 200:
        raise HTTPException(
            status_code=400,
            detail="Failed to get access token from LinkedIn"
        )

    token_data = token_response.json()
    access_token = token_data.get("access_token")

    profile = await get_linkedin_profile(access_token)

    existing_account = db.query(LinkedInAccount).filter(
        LinkedInAccount.user_id == state
    ).first()

    if existing_account:
        existing_account.access_token = access_token
        existing_account.linkedin_id = profile["id"]
        existing_account.linkedin_email = profile["email"]
        existing_account.full_name = profile["name"]
        existing_account.profile_picture = profile["picture"]
        existing_account.is_active = True
        db.commit()
    else:
        new_account = LinkedInAccount(
            id=str(uuid.uuid4()),
            user_id=state,
            linkedin_id=profile["id"],
            linkedin_email=profile["email"],
            full_name=profile["name"],
            profile_picture=profile["picture"],
            access_token=access_token,
            is_active=True
        )
        db.add(new_account)
        db.commit()

    return RedirectResponse(url="http://localhost:3000/dashboard")


@router.get("/status")
async def linkedin_status(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    account = db.query(LinkedInAccount).filter(
        LinkedInAccount.user_id == user_data.get("sub"),
        LinkedInAccount.is_active == True
    ).first()

    if not account:
        return {"connected": False}

    return {
        "connected": True,
        "name": account.full_name,
        "email": account.linkedin_email,
        "picture": account.profile_picture
    }


@router.delete("/disconnect")
async def disconnect_linkedin(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    account = db.query(LinkedInAccount).filter(
        LinkedInAccount.user_id == user_data.get("sub")
    ).first()

    if not account:
        raise HTTPException(
            status_code=404,
            detail="No LinkedIn account connected"
        )

    account.is_active = False
    db.commit()

    return {"message": "LinkedIn disconnected successfully"}