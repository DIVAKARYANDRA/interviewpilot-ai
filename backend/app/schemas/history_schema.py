from datetime import datetime

from pydantic import BaseModel


class InterviewHistoryItem(BaseModel):

    id: int

    company: str

    role: str

    difficulty: str

    overall_score: int

    status: str

    completed_at: datetime | None

    class Config:

        from_attributes = True