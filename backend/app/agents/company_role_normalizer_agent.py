import json

from app.agents.base_agent import BaseAgent
from app.prompts.company_role_prompt import COMPANY_ROLE_PROMPT
from app.schemas.company_role_schema import CompanyRoleNormalization
from app.services.gemini_service import GeminiService


class CompanyRoleNormalizerAgent(BaseAgent):

    def execute(self, state):

        prompt = f"""
{COMPANY_ROLE_PROMPT}

Company:
{state["company"]}

Role:
{state["role"]}
"""

        response = GeminiService.generate(prompt)

        response = response.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

        data = json.loads(response)

        result = CompanyRoleNormalization(**data)

        state["raw_company"] = state["company"]
        state["raw_role"] = state["role"]

        state["company"] = result.normalized_company
        state["role"] = result.normalized_role

        state["company_confidence"] = result.company_confidence
        state["role_confidence"] = result.role_confidence

        state["normalization_reason"] = result.reasoning

        return state