from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.models.user import User
from app.schemas.user import UserUpdate, UserResponse

router = APIRouter()

@router.get("/", response_model=UserResponse)
async def get_user(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_data.get("sub")
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


import httpx
from app.core.config import settings

async def sync_user_from_clerk(user_id: str, db: Session):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.clerk.com/v1/users/{user_id}",
            headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"}
        )
        if response.status_code == 200:
            data = response.json()
            email = data.get("email_addresses", [{}])[0].get("email_address", f"{user_id}@placeholder.com")
            full_name = f"{data.get('first_name', '')} {data.get('last_name', '')}".strip()
            
            new_user = User(
                id=user_id,
                email=email,
                full_name=full_name
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
    return None

@router.patch("/", response_model=UserResponse)
async def update_user(
    payload: UserUpdate,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user_id = user_data.get("sub")
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        user = await sync_user_from_clerk(user_id, db)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)

    return user


@router.delete("/", status_code=204)
async def delete_user(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_data.get("sub")
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_active = False
    db.commit()

    return None