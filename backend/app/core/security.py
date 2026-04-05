from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import httpx
from app.core.config import settings

security = HTTPBearer()

async def verify_clerk_token(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> dict:
    token = credentials.credentials

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.clerk.com/v1/tokens/verify",
            headers={
                "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
                "Content-Type": "application/json"
            },
            params={"token": token}
        )
    if response.status_code != 200:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )
    return response.json()
    

