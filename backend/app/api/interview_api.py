from fastapi import APIRouter

from app.schemas.interview_schema import StartInterviewRequest
from app.schemas.answer_schema import (
    SubmitAnswerRequest,
    SubmitAnswerResponse
)
from app.services.interview_service import (
    start_interview,
    submit_answer,
    end_interview
)
from app.schemas.end_interview_schema import EndInterviewRequest

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.db import get_db
from app.utils.auth_dependency import get_current_user

@router.post(
    "/submit-answer",
    response_model=SubmitAnswerResponse
)
def submit_answer_api(
    request: SubmitAnswerRequest
):

    return submit_answer(request)


@router.post("/start")
def interview(

    request: StartInterviewRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    return start_interview(

        db,

        current_user["user_id"],

        request

    )


@router.post("/end")
def end(

    request: EndInterviewRequest,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    return end_interview(

        db,

        request

    )