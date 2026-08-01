import "./QuestionCard.css";

interface Props {
  question: string;
}

export default function QuestionCard({
  question,
}: Props) {
  return (
    <div className="question-card">

      <span className="question-label">

        🤖 InterviewPilot AI

      </span>

      <h2>

        {question}

      </h2>

    </div>
  );
}