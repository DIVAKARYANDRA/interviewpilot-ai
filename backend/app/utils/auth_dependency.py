from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from jose import jwt

import os

from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = "HS256"


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )

        return payload

    except Exception:

        raise HTTPException(

            status_code=401,

            detail="Invalid token."

        )