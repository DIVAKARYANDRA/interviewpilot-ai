class ResumePrompt:

    @staticmethod
    def build(text: str):

        return f"""
Analyze the following resume.

Extract ONLY the following information.

Return VALID JSON.

Fields:

name

experience

skills

projects

education

summary

Resume

{text}
"""