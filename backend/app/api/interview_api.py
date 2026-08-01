from fastapi import APIRouter

from app.schemas.interview_schema import StartInterviewRequest
from app.schemas.answer_schema import SubmitAnswerRequest
from app.services.interview_service import start_interview

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


@router.post("/start")
def interview(
    request: StartInterviewRequest
):

    return start_interview(request)


@router.post("/submit-answer")
def submit_answer_api(request: SubmitAnswerRequest):

    return submit_answer(request)