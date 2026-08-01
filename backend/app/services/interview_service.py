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

        "projects": data.projects,

        "interview_type": data.interview_type,

        # -----------------------
        # Current Interview State
        # -----------------------

        "current_question": "",

        "current_question_number": 1,

        "total_questions": 10,

        "interview_completed": False,

        # -----------------------
        # History
        # -----------------------

        "previous_questions": [],

        "previous_answers": [],

        "evaluations": [],

        "skill_scores": {}
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

def end_interview(request):

    state = SessionManager.get(request.session_id)

    if not state:

        raise ValueError("Interview not found.")

    graph = InterviewGraph()

    state = graph.finish(state)

    return state["report"]

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

            "session_id": state["session_id"],

            "question": state["current_question"],

            "difficulty": state["difficulty"],

            "question_number": state["current_question_number"],

            "total_questions": state["total_questions"],

            "interview_completed": state["interview_completed"],

            "evaluation": state["evaluations"][-1]
        }

    except Exception as e:
        print("\n========== SUBMIT ANSWER ERROR ==========")
        print(type(e))
        print(str(e))
        print("=========================================\n")
        raise