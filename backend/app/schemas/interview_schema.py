from pydantic import BaseModel


class StartInterviewRequest(BaseModel):

    name: str

    company: str

    role: str

    experience: int

    skills: list[str]

    difficulty: str

    interview_type: str

    projects: list[str] = []