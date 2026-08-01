from typing import TypedDict


class InterviewState(TypedDict):

    session_id: str

    candidate_name: str

    company: str

    role: str

    experience: int

    skills: list[str]

    difficulty: str

    current_question: str

    previous_questions: list[str]

    previous_answers: list[str]

    evaluations: list[dict]

    skill_scores: dict

    interview_completed: bool