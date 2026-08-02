from fastapi import Depends, HTTPException

from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer
)

from app.utils.security import verify_access_token


security = HTTPBearer()


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials


    payload = verify_access_token(token)


    if not payload:

        raise HTTPException(

            status_code=401,

            detail="Invalid token."

        )


    return payload