from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.post import PostStatus

class PostGenerate(BaseModel):
    topic: Optional[str] = None

class PostUpdate(BaseModel):
    content: Optional[str] = None
    scheduled_at: Optional[datetime] = None

class PostSchedule(BaseModel):
    scheduled_at: datetime

class PostResponse(BaseModel):
    id: str
    user_id: str
    content: str
    status: PostStatus
    topic: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    impressions: int
    likes: int
    comments: int
    reposts: int
    created_at: datetime

    class Config:
        from_attributes = True