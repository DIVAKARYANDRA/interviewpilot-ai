from uuid import uuid4

from app.graph.interview_graph import InterviewGraph
from app.graph.session_manager import SessionManager
from app.models.interview import Interview
from app.repositories.interview_repository import create_interview
from datetime import datetime

from app.repositories.interview_repository import (

    get_interview,

    update_interview

)

def def start_interview(

    db,

    user_id,

    data

):

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

    interview = Interview(

        user_id=user_id,

        company=data.company,

        role=data.role,

        interview_type=data.interview_type,

        difficulty=data.difficulty,

        status="IN_PROGRESS"

    )

    interview = create_interview(

        db,

        interview

    )

    

    graph = InterviewGraph()

    try:
        state = graph.start(state)

        state["interview_db_id"] = interview.id

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

def def end_interview(

    db,

    request

):

    state = SessionManager.get(request.session_id)

    if not state:

        raise ValueError("Interview not found.")

    graph = InterviewGraph()

    state = graph.finish(state)

    interview = get_interview(

    db,

    state["interview_db_id"]

    )

    report = state["report"]

    interview.status = "COMPLETED"

    interview.overall_score = report.overall_score

    interview.technical_score = report.technical_score

    interview.communication_score = report.communication_score

    interview.confidence_score = report.confidence_score

    interview.summary = report.summary

    interview.completed_at = datetime.utcnow()

    update_interview(

        db,

        interview

    )

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