from app.agents.base_agent import BaseAgent


class DecisionAgent(BaseAgent):

    def execute(self, state):

        latest = state["evaluations"][-1]

        score = latest["technical_score"]

        # --------------------------
        # Adaptive Difficulty
        # --------------------------

        if score >= 80:
            state["difficulty"] = "Hard"

        elif score >= 60:
            state["difficulty"] = "Medium"

        else:
            state["difficulty"] = "Easy"

        # --------------------------
        # Interview Progress
        # --------------------------

        state["current_question_number"] += 1

        # --------------------------
        # Topic Progress
        # --------------------------

        if state["topic_depth"] >= 3:

            if state["current_topic"]:

                if state["current_topic"] not in state["covered_topics"]:

                    state["covered_topics"].append(

                        state["current_topic"]

                    )

            state["current_topic"] = ""

            state["topic_depth"] = 0

        # --------------------------
        # Interview Phase
        # --------------------------

        q = state["current_question_number"]

        if q == 1:

            state["interview_phase"] = "INTRODUCTION"

        elif q <= 6:

            state["interview_phase"] = "TECHNICAL"

        elif q <= 8:

            state["interview_phase"] = "ROLE_BASED"

        elif q <= 10:

            state["interview_phase"] = "SCENARIO"

        # --------------------------
        # Interview Completion
        # --------------------------

        if q > state["total_questions"]:

            state["interview_completed"] = True

        return state