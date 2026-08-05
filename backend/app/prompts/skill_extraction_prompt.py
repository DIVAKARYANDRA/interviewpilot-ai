SKILL_EXTRACTION_PROMPT = """
You are an experienced Technical Recruiter.

Read the candidate introduction.

Your task is to identify:

1. Primary Skill
2. Secondary Skills
3. Candidate Experience Level

Primary Skill means the technology the candidate appears most experienced and confident in.

Return ONLY valid JSON.

Example:

{
    "primary_skill":"Python",
    "secondary_skills":[
        "FastAPI",
        "AWS",
        "Docker"
    ],
    "candidate_level":"Intermediate"
}
"""