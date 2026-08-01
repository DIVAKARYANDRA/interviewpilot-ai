from app.agents.base_agent import BaseAgent


class DecisionAgent(BaseAgent):

    def execute(self, state):

        latest = state["evaluations"][-1]

        # --------------------------
        # Adaptive Difficulty
        # --------------------------

        if latest["technical_score"] >= 80:

            state["difficulty"] = "Hard"

        elif latest["technical_score"] >= 60:

            state["difficulty"] = "Medium"

        else:

            state["difficulty"] = "Easy"

        # --------------------------
        # Interview Progress
        # --------------------------

        state["current_question_number"] += 1

        # --------------------------
        # Interview Completion
        # --------------------------

        if state["current_question_number"] > state["total_questions"]:

            state["interview_completed"] = True

        return state