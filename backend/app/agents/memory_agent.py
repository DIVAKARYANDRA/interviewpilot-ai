from app.agents.base_agent import BaseAgent


class MemoryAgent(BaseAgent):

    def execute(self, state):

        state["skill_scores"]["overall"] = state["evaluations"][-1]["technical_score"]
        return state