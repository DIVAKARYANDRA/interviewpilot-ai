from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db

from app.utils.auth_dependency import get_current_user

from app.schemas.dashboard_schema import (
    DashboardResponse
)

from app.services.dashboard_service import (
    load_dashboard
)

router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)


@router.get(

    "",

    response_model=DashboardResponse

)

def dashboard(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    return load_dashboard(

        db,

        current_user["user_id"]

    )