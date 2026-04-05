from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str
    GEMINI_API_KEY: str
    LINKEDIN_CLIENT_ID: str
    LINKEDIN_CLIENT_SECRET: str
    LINKEDIN_REDIRECT_URI: str
    CLERK_SECRET_KEY: str
    RESEND_API_KEY: str
    SECRET_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()