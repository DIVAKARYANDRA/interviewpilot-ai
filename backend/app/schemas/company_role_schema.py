from pydantic import BaseModel


class CompanyRoleNormalization(BaseModel):

    normalized_company: str

    normalized_role: str

    company_confidence: float

    role_confidence: float

    reasoning: str