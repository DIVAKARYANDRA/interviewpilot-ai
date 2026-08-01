from app.agents.interviewer_agent import InterviewerAgent
from app.agents.evaluation_agent import EvaluationAgent
from app.agents.decision_agent import DecisionAgent
from app.agents.memory_agent import MemoryAgent
from app.agents.report_agent import ReportAgent

class InterviewGraph:

    def __init__(self):

        self.interviewer = InterviewerAgent()
        self.evaluator = EvaluationAgent()
        self.decision = DecisionAgent()
        self.memory = MemoryAgent()
        self.report = ReportAgent()

    def start(self, state):

        return self.interviewer.execute(state)

    def next(self, state):

        state = self.evaluator.execute(state)

        state = self.decision.execute(state)

        state = self.memory.execute(state)

        state = self.interviewer.execute(state)

        return state

    def finish(self, state):

        state = self.report.execute(state)

        return state