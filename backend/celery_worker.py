from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "linkedin_saas",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.tasks.scheduler",
        "app.tasks.analytics_sync"
    ]
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
)