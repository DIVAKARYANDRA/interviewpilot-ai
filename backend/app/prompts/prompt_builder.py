class PromptBuilder:

    @staticmethod
    def build_interview_prompt(state):

        interview_type = state.get(
            "interview_type",
            "Technical"
        )

        difficulty = state.get(
            "difficulty",
            "Easy"
        )

        previous_questions = "\n".join(
            state.get("previous_questions", [])
        )

        skills = ", ".join(
            state.get("skills", [])
        )

        projects = ", ".join(
            state.get("projects", [])
        )

        projects_section = ""

        if projects:

            projects_section = f"""

Projects:
{projects}

"""

        interview_rules = {

            "Technical": """
- Ask ONLY technical interview questions.
- Focus on programming, backend, frontend, APIs, databases, cloud, architecture and debugging.
- Prefer practical and real-world scenarios.
""",

            "HR": """
- Ask ONLY HR interview questions.
- Focus on communication, teamwork, leadership, conflict resolution, motivation and career goals.
- Do NOT ask technical questions.
""",

            "Behavioral": """
- Ask ONLY behavioral interview questions.
- Use the STAR interview methodology.
- Focus on ownership, leadership, failures, decision making and collaboration.
""",

            "System Design": """
- Ask ONLY system design questions.
- Focus on scalability, databases, caching, messaging, APIs, distributed systems and performance.
""",

            "DSA": """
- Ask ONLY Data Structures and Algorithms questions.
- Cover arrays, linked lists, trees, graphs, dynamic programming, recursion and complexity analysis.
""",

            "Resume": """
- Conduct a resume-based interview.
- Focus primarily on the candidate's projects.
- Ask about architecture, design decisions and implementation.
- Ask why specific technologies were selected.
- Ask about challenges faced.
- Ask about improvements they would make.
- Ask natural follow-up questions.
- Move to skills only after discussing projects.
"""

        }

        rules = interview_rules.get(
            interview_type,
            interview_rules["Technical"]
        )

        return f"""
You are an experienced Senior Software Engineer conducting an interview for {state["company"]}.

Conduct a {interview_type} interview.

=========================
Candidate Details
=========================

Name:
{state["candidate_name"]}

Target Company:
{state["company"]}

Target Role:
{state["role"]}

Experience:
{state["experience"]} years

Difficulty:
{difficulty}

Skills:
{skills}
{projects_section}
=========================
Previous Questions
=========================

{previous_questions}

=========================
Interview Rules
=========================

{rules}

=========================
General Instructions
=========================

- Ask EXACTLY one interview question.
- Do NOT repeat previous questions.
- Maintain {difficulty} difficulty.
- If the previous answer was good, ask a deeper follow-up before changing topics.
- If the previous answer was weak, simplify the next question slightly.
- Keep the conversation natural like a real interviewer.
- Do NOT provide explanations, hints or answers.
- Return ONLY the interview question.
"""