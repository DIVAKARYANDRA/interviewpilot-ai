import json

from pydantic import ValidationError

from app.agents.base_agent import BaseAgent
from app.prompts.evaluation_prompt import EVALUATION_SYSTEM_PROMPT
from app.schemas.evaluation_schema import EvaluationResponse
from app.services.gemini_service import GeminiService


class EvaluationAgent(BaseAgent):

    def execute(self, state):

        question = state["current_question"]
        answer = state["previous_answers"][-1]

        prompt = f"""
{EVALUATION_SYSTEM_PROMPT}

Question:
{question}

Answer:
{answer}
"""

        response = GeminiService.generate(prompt)

        # Remove markdown code fences if present
        response = response.replace("```json", "").replace("```", "").strip()

        try:
            data = json.loads(response)

            evaluation = EvaluationResponse(**data)

            state["evaluations"].append(evaluation.model_dump())

            return state

        except (json.JSONDecodeError, ValidationError):
            raise ValueError(f"Invalid evaluation response:\n{response}")