from celery_worker import celery_app
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.post import Post, PostStatus
from app.models.linkedin_account import LinkedInAccount
from app.services.linkedin_api import fetch_post_analytics

@celery_app.task
async def sync_post_analytics():
    db: Session = SessionLocal()

    try:
        published_posts = db.query(Post).filter(
            Post.status == PostStatus.PUBLISHED,
            Post.linkedin_post_id != None
        ).all()

        for post in published_posts:
            try:
                linkedin_account = db.query(LinkedInAccount).filter(
                    LinkedInAccount.user_id == post.user_id,
                    LinkedInAccount.is_active == True
                ).first()

                if not linkedin_account:
                    continue

                analytics = await fetch_post_analytics(
                    access_token=linkedin_account.access_token,
                    linkedin_post_id=post.linkedin_post_id
                )

                post.impressions = analytics["impressions"]
                post.likes = analytics["likes"]
                post.comments = analytics["comments"]
                post.reposts = analytics["reposts"]
                db.commit()

            except Exception as e:
                print(f"Failed to sync analytics for post {post.id}: {e}")

    finally:
        db.close()