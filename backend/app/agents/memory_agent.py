from app.agents.base_agent import BaseAgent


class MemoryAgent(BaseAgent):

    def execute(self, state):

        latest = state["evaluations"][-1]

        state["skill_scores"]["overall"] = latest["technical_score"]

        state["last_feedback"] = latest.get(
            "overall_feedback",
            ""
        )

        state["last_strengths"] = latest.get(
            "strengths",
            ""
        )

        state["last_improvements"] = latest.get(
            "improvements",
            ""
        )

        # --------------------------
        # Topic Tracking
        # --------------------------

        if not state.get("current_topic"):

            state["current_topic"] = state.get(
                "primary_skill",
                ""
            )

        state["topic_depth"] += 1

        return state