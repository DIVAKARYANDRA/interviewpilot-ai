import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface InterviewContextType {
  sessionId: string;
  question: string;
  answer: string;

  currentQuestion:number;

  totalQuestions:number;

  setCurrentQuestion:(value:number)=>void;

  setTotalQuestions:(value:number)=>void;

  evaluation: any;

  setSessionId: (id: string) => void;
  setQuestion: (question: string) => void;
  setAnswer: (answer: string) => void;
  setEvaluation: (evaluation: any) => void;


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

  const [totalQuestions,setTotalQuestions]=useState(10);

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
        setTotalQuestions
        setSessionId,
        setQuestion,
        setAnswer,
        setEvaluation,
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