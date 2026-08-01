export interface SubmitAnswerRequest {
  session_id: string;
  answer: string;
}

export interface EvaluationResponse {
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  strengths: string[];
  weaknesses: string[];
  feedback: string;
  next_topic: string;
}

export interface SubmitAnswerResponse {
  question: string;
  difficulty: string;
  evaluation: EvaluationResponse;
}

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