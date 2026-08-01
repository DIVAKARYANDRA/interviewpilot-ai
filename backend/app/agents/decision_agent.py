from app.agents.base_agent import BaseAgent


class DecisionAgent(BaseAgent):

    def execute(self, state):

        latest = state["evaluations"][-1]

        if latest["technical_score"] >= 80:

            state["difficulty"] = "Hard"

        elif latest["technical_score"] >= 60:

            state["difficulty"] = "Medium"

        else:

            state["difficulty"] = "Easy"

        return state