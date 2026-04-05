import httpx
from fastapi import HTTPException
from app.core.config import settings

LINKEDIN_API_URL = "https://api.linkedin.com/v2"

async def get_linkedin_profile(access_token: str) -> dict:
    if access_token == "placeholder":
        return {
            "id": "test_linkedin_id",
            "name": "Test User",
            "email": "test@example.com",
            "picture": None
        }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{LINKEDIN_API_URL}/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=400,
            detail="Failed to fetch LinkedIn profile"
        )

    data = response.json()
    return {
        "id": data.get("sub"),
        "name": data.get("name"),
        "email": data.get("email"),
        "picture": data.get("picture")
    }


async def publish_linkedin_post(
    access_token: str,
    linkedin_id: str,
    content: str
) -> str:
    if access_token == "placeholder":
        return "test_post_id_123"

    post_data = {
        "author": f"urn:li:person:{linkedin_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": content
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{LINKEDIN_API_URL}/ugcPosts",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json",
                "X-Restli-Protocol-Version": "2.0.0"
            },
            json=post_data
        )

    if response.status_code != 201:
        raise HTTPException(
            status_code=400,
            detail="Failed to publish post to LinkedIn"
        )

    return response.headers.get("x-restli-id", "unknown_post_id")


async def fetch_post_analytics(
    access_token: str,
    linkedin_post_id: str
) -> dict:
    if access_token == "placeholder":
        return {
            "impressions": 0,
            "likes": 0,
            "comments": 0,
            "reposts": 0
        }

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{LINKEDIN_API_URL}/socialActions/{linkedin_post_id}",
            headers={"Authorization": f"Bearer {access_token}"}
        )

    if response.status_code != 200:
        return {
            "impressions": 0,
            "likes": 0,
            "comments": 0,
            "reposts": 0
        }

    data = response.json()
    return {
        "impressions": data.get("impressionCount", 0),
        "likes": data.get("likesSummary", {}).get("totalLikes", 0),
        "comments": data.get("commentsSummary", {}).get("totalFirstLevelComments", 0),
        "reposts": data.get("sharesSummary", {}).get("totalShares", 0)
    }