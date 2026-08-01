import json

from pydantic import ValidationError

from app.agents.base_agent import BaseAgent
from app.prompts.report_prompt import REPORT_SYSTEM_PROMPT
from app.schemas.report_schema import InterviewReport
from app.services.gemini_service import GeminiService


class ReportAgent(BaseAgent):

    def execute(self, state):

        prompt = f"""
{REPORT_SYSTEM_PROMPT}

Questions:

{state["previous_questions"]}

Answers:

{state["previous_answers"]}

Evaluations:

{state["evaluations"]}
"""

        response = GeminiService.generate(prompt)

        response = response.replace("```json", "").replace("```", "").strip()

        try:

            report = InterviewReport(
                **json.loads(response)
            )

            state["report"] = report.model_dump()

            return state

        except (ValidationError, json.JSONDecodeError):

            raise ValueError(response)