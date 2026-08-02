from pydantic import BaseModel


class UpdateProfileRequest(BaseModel):

    name:str



class UpdatePasswordRequest(BaseModel):

    password:str