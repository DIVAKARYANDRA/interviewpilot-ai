from typing import List

from pydantic import BaseModel


# ----------------------------
# Request
# ----------------------------

class SubmitAnswerRequest(BaseModel):

    session_id: str

    answer: str


# ----------------------------
# Evaluation
# ----------------------------

class EvaluationResponse(BaseModel):

    technical_score: int

    communication_score: int

    confidence_score: int

    strengths: List[str]

    weaknesses: List[str]

    feedback: str

    next_topic: str


# ----------------------------
# Response
# ----------------------------

class SubmitAnswerResponse(BaseModel):

    session_id: str

    question: str

    difficulty: str

    question_number: int

    total_questions: int

    interview_completed: bool

    evaluation: EvaluationResponse