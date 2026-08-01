from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.services.resume_service import ResumeService

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post("/analyze")
async def analyze_resume(

    file: UploadFile = File(...)

):

    return await ResumeService.analyze_resume(
        file
    )