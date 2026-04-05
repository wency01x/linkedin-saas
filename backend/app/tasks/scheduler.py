from celery_worker import celery_app
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.post import Post, PostStatus
from app.services.linkedin_api import publish_linkedin_post
from app.models.linkedin_account import LinkedInAccount
from datetime import datetime, timezone

@celery_app.task
async def publish_scheduled_posts():
    db: Session = SessionLocal()

    try:
        now = datetime.now(timezone.utc)

        scheduled_posts = db.query(Post).filter(
            Post.status == PostStatus.SCHEDULED,
            Post.scheduled_at <= now
        ).all()

        for post in scheduled_posts:
            try:
                linkedin_account = db.query(LinkedInAccount).filter(
                    LinkedInAccount.user_id == post.user_id,
                    LinkedInAccount.is_active == True
                ).first()

                if not linkedin_account:
                    continue

                linkedin_post_id = await publish_linkedin_post(
                    access_token=linkedin_account.access_token,
                    linkedin_id=linkedin_account.linkedin_id,
                    content=post.content
                )

                post.status = PostStatus.PUBLISHED
                post.published_at = now
                post.linkedin_post_id = linkedin_post_id
                db.commit()

            except Exception as e:
                post.status = PostStatus.FAILED
                db.commit()
                print(f"Failed to publish post {post.id}: {e}")

    finally:
        db.close()