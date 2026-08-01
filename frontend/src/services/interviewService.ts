import api from "../api/api";
import type {
  StartInterviewRequest,
  StartInterviewResponse
} from "../types/interview";

export async function startInterview(
  data: StartInterviewRequest
) {
  const response =
    await api.post<StartInterviewResponse>(
      "/interview/start",
      data
    );

  return response.data;
}