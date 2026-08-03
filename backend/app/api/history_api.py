from typing import List

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.dependencies.auth_dependency import (
    get_current_user
)

from app.schemas.history_schema import (
    InterviewHistoryItem
)

from app.services.history_service import (
    load_history
)

router = APIRouter(

    prefix="/history",

    tags=["History"]

)


@router.get(

    "",

    response_model=List[InterviewHistoryItem]

)

def history(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    return load_history(

        db,

        current_user["user_id"]

    )