from fastapi import APIRouter

from app.schemas.interview_schema import StartInterviewRequest

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