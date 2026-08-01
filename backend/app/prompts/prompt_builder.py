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

        interview_rules = {

            "Technical": """
- Ask only technical questions.
- Focus on coding, backend, frontend, databases, APIs, cloud and architecture.
- Ask practical questions.
""",

            "HR": """
- Ask HR interview questions only.
- Focus on communication, teamwork, leadership, motivation and career goals.
- Do not ask technical questions.
""",

            "Behavioral": """
- Ask behavioral interview questions.
- Use STAR methodology.
- Focus on ownership, leadership, failures, conflict resolution and decision making.
""",

            "System Design": """
- Ask system design questions.
- Focus on scalability, databases, caching, messaging, APIs and distributed systems.
""",

            "DSA": """
- Ask Data Structures & Algorithms questions.
- Cover arrays, linked lists, trees, graphs, dynamic programming and complexity analysis.
""",

            "Resume": """
- Ask questions based on the candidate's projects, experience and listed skills.
- Dive deeper into project architecture and implementation.
"""

        }

        rules = interview_rules.get(
            interview_type,
            interview_rules["Technical"]
        )

        return f"""
You are an experienced senior interviewer from {state["company"]}.

Conduct a {interview_type} interview.

Candidate Details

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

Previous Questions:
{previous_questions}

Instructions

{rules}

General Rules

- Ask exactly ONE interview question.
- Do NOT repeat previous questions.
- Keep the difficulty at {difficulty}.
- If this is not the first question, ask a logical follow-up or move to another relevant topic.
- Return only the interview question.
"""