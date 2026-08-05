from pydantic import BaseModel


class JobDescriptionAnalysis(BaseModel):

    required_skills: list[str]

    preferred_skills: list[str]

    responsibilities: list[str]

    required_experience: str

    focus_area: str