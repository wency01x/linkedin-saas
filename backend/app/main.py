from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api.v1 import auth, users, posts, content, analytics, linkedin

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LinkedIn SaaS API",
    description="AI-powered LinkedIn content creation system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(posts.router, prefix="/api/v1/posts", tags=["Posts"])
app.include_router(content.router, prefix="/api/v1/content", tags=["Content"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(linkedin.router, prefix="/api/v1/linkedin", tags=["LinkedIn"])

@app.get("/")
async def root():
    return {"message": "LinkedIn SaaS API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}