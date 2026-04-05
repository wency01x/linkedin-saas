from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_clerk_token
from app.models.post import Post, PostStatus

router = APIRouter()

@router.get("/summary")
async def get_analytics_summary(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user_id = user_data.get("sub")

    posts = db.query(Post).filter(
        Post.user_id == user_id
    ).all()

    published_posts = [p for p in posts if p.status == PostStatus.PUBLISHED]
    scheduled_posts = [p for p in posts if p.status == PostStatus.SCHEDULED]
    draft_posts = [p for p in posts if p.status == PostStatus.DRAFT]

    total_impressions = sum(p.impressions for p in published_posts)
    total_likes = sum(p.likes for p in published_posts)
    total_comments = sum(p.comments for p in published_posts)
    total_reposts = sum(p.reposts for p in published_posts)

    top_post = None
    if published_posts:
        top_post = max(published_posts, key=lambda p: p.impressions)
        top_post = {
            "id": top_post.id,
            "content": top_post.content[:100] + "...",
            "impressions": top_post.impressions,
            "likes": top_post.likes
        }

    return {
        "total_posts": len(posts),
        "published": len(published_posts),
        "scheduled": len(scheduled_posts),
        "drafts": len(draft_posts),
        "total_impressions": total_impressions,
        "total_likes": total_likes,
        "total_comments": total_comments,
        "total_reposts": total_reposts,
        "top_post": top_post
    }


@router.get("/posts")
async def get_posts_analytics(
    user_data: dict = Depends(verify_clerk_token),
    db: Session = Depends(get_db)
):
    user_id = user_data.get("sub")

    posts = db.query(Post).filter(
        Post.user_id == user_id,
        Post.status == PostStatus.PUBLISHED
    ).order_by(Post.published_at.desc()).all()

    return [
        {
            "id": post.id,
            "topic": post.topic,
            "content": post.content[:100] + "...",
            "published_at": post.published_at,
            "impressions": post.impressions,
            "likes": post.likes,
            "comments": post.comments,
            "reposts": post.reposts,
            "engagement_rate": round(
                (post.likes + post.comments + post.reposts) /
                post.impressions * 100, 2
            ) if post.impressions > 0 else 0
        }
        for post in posts
    ]