import "./EvaluationPanel.css";

interface Props {
    evaluation: any;
}

export default function EvaluationPanel({

    evaluation

}: Props) {

    if (!evaluation) {

        return null;

    }

    return (

        <div className="evaluation-card">

            <h2>

                AI Evaluation

            </h2>

            <div className="scores">

                <div>

                    <strong>Technical</strong>

                    <p>{evaluation.technical_score}</p>

                </div>

                <div>

                    <strong>Communication</strong>

                    <p>{evaluation.communication_score}</p>

                </div>

                <div>

                    <strong>Confidence</strong>

                    <p>{evaluation.confidence_score}</p>

                </div>

            </div>

            <h3>Strengths</h3>

            <ul>

                {evaluation.strengths.map((item: string) => (

                    <li key={item}>{item}</li>

                ))}

            </ul>

            <h3>Weaknesses</h3>

            <ul>

                {evaluation.weaknesses.map((item: string) => (

                    <li key={item}>{item}</li>

                ))}

            </ul>

            <h3>Feedback</h3>

            <p>

                {evaluation.feedback}

            </p>

            <h3>Recommended Next Topic</h3>

            <p>

                {evaluation.next_topic}

            </p>

        </div>

    );

}