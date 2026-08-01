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

    session_id: string;

    question: string;

    difficulty: string;

    question_number: number;

    total_questions: number;

    interview_completed: boolean;

    evaluation: EvaluationResponse;

}

export interface StartInterviewRequest {
  name: string;
  company: string;
  role: string;
  experience: number;
  skills: string[];
  difficulty: string;
  interview_type:string;
}

export interface StartInterviewResponse {
  session_id: string;
  question: string;
}