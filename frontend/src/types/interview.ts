export interface StartInterviewRequest {
  name: string;
  company: string;
  role: string;
  experience: number;
  skills: string[];
  difficulty: string;
}

export interface StartInterviewResponse {
  session_id: string;
  question: string;
}