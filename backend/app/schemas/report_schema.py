from pydantic import BaseModel


class InterviewReport(BaseModel):

    overall_score: int

    technical_score: int

    communication_score: int

    confidence_score: int

    strengths: list[str]

    weaknesses: list[str]

    learning_roadmap: list[str]

    company_readiness: str

    summary: str