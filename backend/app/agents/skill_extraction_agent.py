import json

from app.agents.base_agent import BaseAgent
from app.prompts.skill_extraction_prompt import SKILL_EXTRACTION_PROMPT
from app.services.gemini_service import GeminiService


class SkillExtractionAgent(BaseAgent):


    def execute(self, state):

        if state.get("primary_skill"):
            return state

        introduction = state["previous_answers"][0]

        prompt = f"""
{SKILL_EXTRACTION_PROMPT}

Candidate Introduction:

{introduction}
"""

        try:

            response = GeminiService.generate(prompt)

            response = response.replace(
                "```json",
                ""
            ).replace(
                "```",
                ""
            ).strip()

            data = json.loads(response)

            state["primary_skill"] = data.get(
                "primary_skill",
                ""
            )

            state["current_topic"] = state["primary_skill"]

            state["secondary_skills"] = data.get(
                "secondary_skills",
                []
            )

            state["candidate_level"] = data.get(
                "candidate_level",
                ""
            )

            state["current_topic"] = state["primary_skill"]

        except Exception:

            # Safe fallback
            state["primary_skill"] = ""

        return state