from app.prompts.system_prompt import SYSTEM_PROMPT

from app.services.gemini_service import GeminiService


class InterviewerAgent:

    @staticmethod
    def generate_question(data):

        prompt = f"""
{SYSTEM_PROMPT}

Candidate Name:
{data["name"]}

Company:
{data["company"]}

Role:
{data["role"]}

Experience:
{data["experience"]}

Skills:
{", ".join(data["skills"])}

Difficulty:
{data["difficulty"]}

Generate the FIRST interview question.
"""

        return GeminiService.generate(prompt)