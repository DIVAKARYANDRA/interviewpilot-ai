from datetime import datetime

from pydantic import BaseModel


class ActivityResponse(BaseModel):

    id: int

    activity_type: str

    title: str

    score: int | None = None

    created_at: datetime

    class Config:

        from_attributes = True