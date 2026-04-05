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


@router.patch("/", response_model=UserResponse)
async def update_user(
    payload: UserUpdate,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_data.get("sub")
    ).first()

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