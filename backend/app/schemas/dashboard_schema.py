from pydantic import BaseModel


class RecentInterview(BaseModel):

    id: int

    company: str

    role: str

    overall_score: int

    class Config:

        from_attributes = True


class DashboardResponse(BaseModel):

    total_interviews: int

    average_score: int

    best_score: int

    recent_interviews: list[RecentInterview]