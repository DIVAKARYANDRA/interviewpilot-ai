from pydantic import BaseModel


class ResumeAnalysisResponse(BaseModel):

    name: str

    experience: int

    skills: list[str]

    projects: list[str]

    education: str

    summary: str