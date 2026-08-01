from pydantic import BaseModel


class EvaluationResponse(BaseModel):

    technical_score: int

    communication_score: int

    confidence_score: int

    strengths: list[str]

    weaknesses: list[str]

    feedback: str

    next_topic: str