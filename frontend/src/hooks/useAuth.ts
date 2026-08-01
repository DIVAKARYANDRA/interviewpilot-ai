import { loginUser } from "../services/authService";
import { saveToken } from "../utils/token";

export async function login(
  email: string,
  password: string
) {
  const response = await loginUser({
    email,
    password,
  });

  saveToken(response.access_token);

  return response;
}