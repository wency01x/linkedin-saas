from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.models.post import Post, PostStatus
from app.models.user import User
from app.schemas.post import PostGenerate, PostResponse
from app.services.ai_content import generate_linkedin_post, generate_bulk_linkedin_posts
import uuid
import asyncio

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

    try:
        generated = await generate_linkedin_post(
            topic=payload.topic or f"insights in {user.industry}",
            industry=user.industry,
            target_audience=user.target_audience,
            tone=user.tone,
            formatting_style=user.formatting_style,
            vocabulary_rules=user.vocabulary_rules,
            example_posts=user.example_posts
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI Content Generation failed. Please check your Gemini API Key. Details: {str(e)}"
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

    try:
        results = await generate_bulk_linkedin_posts(
            topics=topics,
            industry=user.industry,
            target_audience=user.target_audience,
            tone=user.tone,
            formatting_style=user.formatting_style,
            vocabulary_rules=user.vocabulary_rules,
            example_posts=user.example_posts
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"AI Bulk Content Generation failed. Details: {str(e)}"
        )

    posts = []
    for generated in results:
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