import api from "../api/api";
import type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "../types/auth";

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

export async function updateProfile(
    name:string
){

    const response =
        await api.put(
            "/auth/profile",
            {
                name
            }
        );

    return response.data;

}



export async function updatePassword(
    current_password:string,
    new_password:string
){

    const response =
        await api.put(
            "/auth/password",
            {
                current_password,
                new_password
            }
        );


    return response.data;

}