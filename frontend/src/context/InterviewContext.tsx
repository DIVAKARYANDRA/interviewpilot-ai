import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ReportResponse } from "../types/report";

export type InterviewStage =

    | "connecting"

    | "greeting"

    | "interview"

    | "closing"

    | "report";

interface InterviewContextType {
  sessionId: string;
  question: string;
  answer: string;

  currentQuestion:number;

  totalQuestions:number;

  setCurrentQuestion:(value:number)=>void;

  setTotalQuestions:(value:number)=>void;

  report:ReportResponse | null;

  setReport:(report:ReportResponse)=>void;

  evaluation: any;

  interviewMode: "text" | "voice";

  stage:InterviewStage;

  setStage:(stage:InterviewStage)=>void;

  setInterviewMode: (
      mode: "text" | "voice"
  ) => void;

  setSessionId: (id: string) => void;
  setQuestion: (question: string) => void;
  setAnswer: (answer: string) => void;
  setEvaluation: (evaluation: any) => void;

  recruiterState:
    "idle"
    | "speaking"
    | "listening"
    | "thinking";

setRecruiterState:(
    value:
        "idle"
        | "speaking"
        | "listening"
        | "thinking"
)=>void;




}

const InterviewContext = createContext<InterviewContextType | null>(null);

export function InterviewProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [sessionId, setSessionId] = useState("");

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] = useState<any>(null);

  const [currentQuestion,setCurrentQuestion]=useState(1);

  const [report,setReport] = useState<ReportResponse | null>(null);

  const [totalQuestions,setTotalQuestions]=useState(10);

  const [interviewMode, setInterviewMode] = useState<"text" | "voice">("voice");

  const [recruiterState, setRecruiterState] = useState<
    "idle" | "speaking" | "listening" | "thinking"
>("idle");

  const [stage,setStage]=useState<InterviewStage>(

"connecting"

);

  return (
    <InterviewContext.Provider
      value={{
        sessionId,
        question,
        answer,
        evaluation,
        currentQuestion,
        setCurrentQuestion,
        totalQuestions,
        setTotalQuestions,
        setSessionId,
        setQuestion,
        setAnswer,
        setEvaluation,
        report,
        setReport,
        interviewMode,
        stage,
        setStage,
        setInterviewMode,
        recruiterState,

setRecruiterState
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {

  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error(
      "useInterview must be used inside InterviewProvider"
    );
  }

  return context;
}