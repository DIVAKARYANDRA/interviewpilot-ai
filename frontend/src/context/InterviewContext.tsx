import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface InterviewContextType {
  sessionId: string;
  question: string;
  setSessionId: (id: string) => void;
  setQuestion: (question: string) => void;
}

const InterviewContext = createContext<InterviewContextType | null>(null);

export function InterviewProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sessionId, setSessionId] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <InterviewContext.Provider
      value={{
        sessionId,
        question,
        setSessionId,
        setQuestion,
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