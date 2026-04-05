from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    industry: Optional[str] = None
    target_audience: Optional[str] = None
    tone: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None
    industry: Optional[str] = None
    target_audience: Optional[str] = None
    tone: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True