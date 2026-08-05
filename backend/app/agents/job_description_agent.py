import json

from app.agents.base_agent import BaseAgent

from app.prompts.job_description_prompt import JOB_DESCRIPTION_PROMPT

from app.schemas.job_description_schema import JobDescriptionAnalysis

from app.services.gemini_service import GeminiService


class JobDescriptionAgent(BaseAgent):

    def execute(self, state):

        jd = state.get("job_description", "").strip()

        if not jd:

            return state

        prompt = f"""
{JOB_DESCRIPTION_PROMPT}

Job Description:

{jd}
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

        result = JobDescriptionAnalysis(**data)

        state["jd_required_skills"] = result.required_skills

        state["jd_preferred_skills"] = result.preferred_skills

        state["jd_responsibilities"] = result.responsibilities

        state["jd_required_experience"] = result.required_experience

        state["jd_focus_area"] = result.focus_area

        return state