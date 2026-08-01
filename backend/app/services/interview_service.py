from uuid import uuid4

from app.agents.interviewer_agent import InterviewerAgent
from app.graph.interview_graph import InterviewGraph


def start_interview(data):

    state = {

        "session_id": str(uuid4()),

        "candidate_name": data.name,

        "company": data.company,

        "role": data.role,

        "experience": data.experience,

        "skills": data.skills,

        "difficulty": data.difficulty,

        "current_question": "",

        "previous_questions": [],

        "previous_answers": [],

        "evaluations": [],

        "skill_scores": {},

        "interview_completed": False
    }

    graph = InterviewGraph()
    state = graph.start(state)
    SessionManager.create(state)

    return {

        "session_id": state["session_id"],

        "question": state["current_question"]
    }


def submit_answer(request):

    state = SessionManager.get(request.session_id)

    if not state:

        raise ValueError("Interview session not found.")

    state["previous_answers"].append(request.answer)

    state = graph.next(state)

    SessionManager.update(state)

    return {

        "question": state["current_question"],

        "difficulty": state["difficulty"],

        "evaluation": state["evaluations"][-1]
    }