import api from "../api/api";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "../types/auth";

from app.utils.security import hash_password


def update_profile(
    db: Session,
    user_id: int,
    name: str
):

    user = get_user_by_id(
        db,
        user_id
    )


    if not user:
        raise ValueError(
            "User not found"
        )


    user.name = name

    db.commit()

    db.refresh(user)

    return user



def update_password(
    db: Session,
    user_id: int,
    password: str
):

    user = get_user_by_id(
        db,
        user_id
    )


    if not user:
        raise ValueError(
            "User not found"
        )


    user.password = hash_password(
        password
    )

    db.commit()

    return True

export async function registerUser(
  data: RegisterRequest
) {
  return api.post("/auth/register", data);
}

export async function loginUser(
  data: LoginRequest
) {
  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      data
    );

  return response.data;
}

export async function getCurrentUser(){

    const response =
        await api.get(
            "/auth/me"
        );


    return response.data;

}