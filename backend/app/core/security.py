from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt
from jwt import PyJWKClient

security = HTTPBearer()

# Clerk Frontend API JWKS endpoint for token verification
JWKS_URL = "https://uncommon-condor-11.clerk.accounts.dev/.well-known/jwks.json"
jwks_client = PyJWKClient(JWKS_URL)

async def verify_clerk_token(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> dict:
    token = credentials.credentials

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_aud": False},
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")