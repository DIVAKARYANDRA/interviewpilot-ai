class PromptBuilder:

    @staticmethod
    def build_interview_prompt(state):

        return f"""
You are an expert interviewer.

Candidate:
{state["candidate_name"]}

Company:
{state["company"]}

Role:
{state["role"]}

Experience:
{state["experience"]}

Skills:
{", ".join(state["skills"])}

Previous Questions:
{state["previous_questions"]}

Ask ONLY the next interview question.
"""