from pydantic import BaseModel


class ResumeAnalysisResponse(BaseModel):

    name: str

    experience: int

    current_company: str | None = None

    suggested_role: str | None = None

    skills: list[str]

    projects: list[str]

    education: str

    summary: str