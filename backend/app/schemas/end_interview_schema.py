from pydantic import BaseModel


class EndInterviewRequest(BaseModel):

    session_id: str