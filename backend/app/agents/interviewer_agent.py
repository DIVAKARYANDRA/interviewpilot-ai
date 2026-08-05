from app.agents.base_agent import BaseAgent
from app.prompts.prompt_builder import PromptBuilder
from app.services.gemini_service import GeminiService
from datetime import datetime


class InterviewerAgent(BaseAgent):

    def execute(self, state):

        current_hour = datetime.now().hour

        if current_hour < 12:
            greeting = "Good morning"
        elif current_hour < 17:
            greeting = "Good afternoon"
        else:
            greeting = "Good evening"

        phase = state.get("interview_phase", "TECHNICAL")

        # --------------------------------------------------
        # Phase 1 - Personalized Introduction
        # --------------------------------------------------

        if phase == "INTRODUCTION":

            company = state.get("company", "the company")
            role = state.get("role", "Software Engineer")
            experience = state.get("experience", 0)
            candidate = state.get("candidate_name", "Candidate")
            interview_type = state.get("interview_type", "Technical")

            skills = ", ".join(state.get("skills", []))

            if interview_type == "HR":

                intro = (
                    f"{greeting} {candidate}. "
                    f"Welcome to InterviewPilot. "
                    f"I'll be conducting your HR interview today for the {role} position at {company}. "
                    f"I see that you have around {experience} years of experience. "
                    f"To begin, could you please introduce yourself and briefly walk me through your professional journey?"
                )

            elif interview_type == "Resume":

                intro = (
                    f"{greeting} {candidate}. "
                    f"Welcome to InterviewPilot. "
                    f"I'll be conducting your resume-based interview today for the {role} position at {company}. "
                    f"I noticed your profile includes experience with {skills}. "
                    f"Please introduce yourself and explain your recent projects, responsibilities and achievements."
                )

            else:

                intro = (
                    f"{greeting} {candidate}. "
                    f"Welcome to InterviewPilot. "
                    f"I'll be conducting your {role} interview today for {company}. "
                    f"I see that you've selected technologies such as {skills} and have around {experience} years of experience. "
                    f"Before we begin the technical discussion, could you please introduce yourself and tell me about your recent work, projects and technologies you've been working with?"
                )

            state["current_question"] = intro
            state["previous_questions"].append(intro)

            return state

        # --------------------------------------------------
        # Remaining Interview
        # --------------------------------------------------

        prompt = PromptBuilder.build_interview_prompt(state)

        question = GeminiService.generate(prompt)

        state["current_question"] = question
        state["previous_questions"].append(question)

        return state