from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.models.post import Post, PostStatus
from app.models.user import User
from app.schemas.post import PostGenerate, PostResponse
from app.services.ai_content import generate_linkedin_post
import uuid

router = APIRouter()

@router.post("/generate", response_model=PostResponse)
async def generate_post(
    payload: PostGenerate,
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_data.get("sub")
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.industry or not user.target_audience or not user.tone:
        raise HTTPException(
            status_code=400,
            detail="Please complete your voice profile first"
        )

    generated = await generate_linkedin_post(
        topic=payload.topic or f"insights in {user.industry}",
        industry=user.industry,
        target_audience=user.target_audience,
        tone=user.tone
    )

    new_post = Post(
        id=str(uuid.uuid4()),
        user_id=user.id,
        content=generated["content"],
        topic=generated["topic"],
        status=PostStatus.DRAFT
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


@router.post("/generate/bulk", response_model=list[PostResponse])
async def generate_bulk_posts(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_data.get("sub")
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.industry or not user.target_audience or not user.tone:
        raise HTTPException(
            status_code=400,
            detail="Please complete your voice profile first"
        )

    topics = [
        f"biggest challenge in {user.industry}",
        f"lessons learned in {user.industry}",
        f"future of {user.industry}",
        f"advice for {user.target_audience}",
    ]

    posts = []

    for topic in topics:
        generated = await generate_linkedin_post(
            topic=topic,
            industry=user.industry,
            target_audience=user.target_audience,
            tone=user.tone
        )

        new_post = Post(
            id=str(uuid.uuid4()),
            user_id=user.id,
            content=generated["content"],
            topic=generated["topic"],
            status=PostStatus.DRAFT
        )

        db.add(new_post)
        posts.append(new_post)

    db.commit()

    for post in posts:
        db.refresh(post)

    return posts