from app.agents.base_agent import BaseAgent

from app.prompts.prompt_builder import PromptBuilder

from app.services.gemini_service import GeminiService


class InterviewerAgent(BaseAgent):

    def execute(self, state):

        phase = state.get("interview_phase", "TECHNICAL")

        if phase == "INTRODUCTION":

            state["current_question"] = (
                "Good to meet you. Please introduce yourself and walk me through your background."
            )

            state["previous_questions"].append(
                state["current_question"]
            )

            return state

        if phase == "STRENGTH_DISCOVERY":

            state["current_question"] = (
                "Thank you. Which technical skill are you most confident in, and why?"
            )

            state["previous_questions"].append(
                state["current_question"]
            )

            return state

        prompt = PromptBuilder.build_interview_prompt(state)

        phase = state.get("interview_phase")

        if phase == "INTRODUCTION":

            state["current_question"] = (
                "Good to meet you. Please introduce yourself and briefly walk me through your professional background, recent work, and the technologies you've been working with."
            )

            state["previous_questions"].append(state["current_question"])

            return state

        question = GeminiService.generate(prompt)

        state["current_question"] = question

        state["previous_questions"].append(question)

        return state