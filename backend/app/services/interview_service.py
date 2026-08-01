from app.agents.interviewer_agent import InterviewerAgent


def start_interview(data):

    question = InterviewerAgent.generate_question(
        data.dict()
    )

    return {

        "session_id": "demo-session",

        "question": question
    }