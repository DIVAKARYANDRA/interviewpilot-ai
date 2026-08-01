from uuid import uuid4

from app.graph.interview_graph import InterviewGraph
from app.graph.session_manager import SessionManager


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

    try:
        state = graph.start(state)

        SessionManager.create(state)

        return {
            "session_id": state["session_id"],
            "question": state["current_question"]
        }

    except Exception as e:
        print("\n========== START INTERVIEW ERROR ==========")
        print(type(e))
        print(str(e))
        print("===========================================\n")
        raise


def submit_answer(request):

    state = SessionManager.get(request.session_id)

    if not state:
        raise ValueError("Interview session not found.")

    state["previous_answers"].append(request.answer)

    graph = InterviewGraph()

    try:
        state = graph.next(state)

        SessionManager.update(state)

        return {
            "question": state["current_question"],
            "difficulty": state["difficulty"],
            "evaluation": state["evaluations"][-1]
        }

    except Exception as e:
        print("\n========== SUBMIT ANSWER ERROR ==========")
        print(type(e))
        print(str(e))
        print("=========================================\n")
        raise