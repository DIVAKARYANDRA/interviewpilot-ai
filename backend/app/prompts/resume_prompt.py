class ResumePrompt:

    @staticmethod
    def build(text: str) -> str:
        return f"""Analyze the following resume and extract ONLY the requested fields.

Fields to extract:
- name: Full name of the candidate (string)
- experience: Total years of professional experience as a number/integer (e.g., 5)
- skills: List of key technical and professional skills (array of strings)
- projects: List of key projects mentioned (array of strings)
- education: Highest degree or latest education background (string)
- summary: Brief 2-3 sentence overview of the candidate (string)

Resume:
{text}

Return ONLY a valid JSON object matching this exact structure:

{{
  "name": "",
  "experience": "",
  "skills": [],
  "projects": [],
  "education": "",
  "summary": ""
}}

Do not include markdown formatting, backticks, code fences (such as ```json), or explanatory text.
"""