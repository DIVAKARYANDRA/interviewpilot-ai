from pydantic import BaseModel

class SubmitAnswerRequest(BaseModel):

    session_id: str

    answer: str