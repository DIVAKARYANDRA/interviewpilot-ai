from app.agents.base_agent import BaseAgent

from app.prompts.system_prompt import SYSTEM_PROMPT
from app.prompts.prompt_builder import PromptBuilder
from app.services.gemini_service import GeminiService

prompt = PromptBuilder.build_interview_prompt(state)

question = GeminiService.generate(prompt)