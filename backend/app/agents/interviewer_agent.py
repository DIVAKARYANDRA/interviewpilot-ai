from app.agents.base_agent import BaseAgent

from app.prompts.prompt_builder import PromptBuilder

from app.services.gemini_service import GeminiService


class InterviewerAgent(BaseAgent):

    def execute(self, state):

        prompt = PromptBuilder.build_interview_prompt(state)

        question = GeminiService.generate(prompt)

        state["current_question"] = question

        state["previous_questions"].append(question)

        return state