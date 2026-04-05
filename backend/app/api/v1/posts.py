from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.models.post import Post, PostStatus
from app.schemas.post import PostUpdate, PostSchedule, PostResponse
import uuid

router = APIRouter()

@router.get("/", response_model=List[PostResponse])
async def get_posts(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    posts = db.query(Post).filter(
        Post.user_id == user_data.get("sub")
    ).order_by(Post.created_at.desc()).all()

    return posts


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(
    post_id: str,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.user_id == user_data.get("sub")
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    return post


@router.patch("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: str,
    payload: PostUpdate,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.user_id == user_data.get("sub")
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.status == PostStatus.PUBLISHED:
        raise HTTPException(
            status_code=400,
            detail="Cannot edit a published post"
        )

    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(post, field, value)

    db.commit()
    db.refresh(post)

    return post


@router.post("/{post_id}/schedule", response_model=PostResponse)
async def schedule_post(
    post_id: str,
    payload: PostSchedule,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.user_id == user_data.get("sub")
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.status == PostStatus.PUBLISHED:
        raise HTTPException(
            status_code=400,
            detail="Post is already published"
        )

    post.scheduled_at = payload.scheduled_at
    post.status = PostStatus.SCHEDULED
    db.commit()
    db.refresh(post)

    return post


@router.delete("/{post_id}", status_code=204)
async def delete_post(
    post_id: str,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.user_id == user_data.get("sub")
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.status == PostStatus.PUBLISHED:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete a published post"
        )

    db.delete(post)
    db.commit()

    return None