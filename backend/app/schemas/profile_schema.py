from pydantic import BaseModel


class UpdateProfileRequest(BaseModel):

    name: str



class UpdatePasswordRequest(BaseModel):

    current_password: str

    new_password: str