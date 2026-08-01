from app.agents.interviewer_agent import InterviewerAgent
from app.agents.evaluation_agent import EvaluationAgent
from app.agents.decision_agent import DecisionAgent
from app.agents.memory_agent import MemoryAgent


class InterviewGraph:

    def __init__(self):

        self.interviewer = InterviewerAgent()
        self.evaluator = EvaluationAgent()
        self.decision = DecisionAgent()
        self.memory = MemoryAgent()

    def start(self, state):

        return self.interviewer.execute(state)

    def next(self, state):

        state = self.evaluator.execute(state)

        state = self.decision.execute(state)

        state = self.memory.execute(state)

        state = self.interviewer.execute(state)

        return state