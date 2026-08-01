import type { ReactNode } from "react";
import "./InterviewLayout.css";

interface Props {
  children: ReactNode;
}

export default function InterviewLayout({ children }: Props) {
  return (
    <div className="interview-layout">
      {children}
    </div>
  );
}