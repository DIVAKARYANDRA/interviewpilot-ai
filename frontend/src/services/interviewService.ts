import api from "../api/api";
import type {
  StartInterviewRequest,
  StartInterviewResponse
} from "../types/interview";
import type {
  SubmitAnswerRequest,
  SubmitAnswerResponse
} from "../types/interview";

export async function submitAnswer(
  data: SubmitAnswerRequest
) {
  const response =
    await api.post<SubmitAnswerResponse>(
      "/interview/submit-answer",
      data
    );

  return response.data;
}

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