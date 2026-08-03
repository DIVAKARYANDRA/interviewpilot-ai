import "./EvaluationPanel.css";

interface Props {

    evaluation:any;

}

export default function EvaluationPanel({

    evaluation

}:Props){

    if(!evaluation){

        return null;

    }

    const overall = Math.round(

        (

            evaluation.technical_score +

            evaluation.communication_score +

            evaluation.confidence_score

        ) / 3

    );

    return(

        <div className="evaluation-card">

            <div className="evaluation-header">

                <div>

                    <h2>

                        🤖 AI Performance Feedback

                    </h2>

                    <p>

                        Here's how you performed in this question.

                    </p>

                </div>

                <div className="overall-score">

                    {overall}

                    <span>/100</span>

                </div>

            </div>

            <div className="score-grid">

                <div className="score-card">

                    <span>

                        💻

                    </span>

                    <h4>

                        Technical

                    </h4>

                    <h3>

                        {evaluation.technical_score}

                    </h3>

                </div>

                <div className="score-card">

                    <span>

                        💬

                    </span>

                    <h4>

                        Communication

                    </h4>

                    <h3>

                        {evaluation.communication_score}

                    </h3>

                </div>

                <div className="score-card">

                    <span>

                        🚀

                    </span>

                    <h4>

                        Confidence

                    </h4>

                    <h3>

                        {evaluation.confidence_score}

                    </h3>

                </div>

            </div>

            <div className="feedback-grid">

                <div className="feedback-box strengths">

                    <h3>

                        ✅ Strengths

                    </h3>

                    <ul>

                        {

                            evaluation.strengths.map(

                                (item:string)=>(

                                    <li key={item}>

                                        {item}

                                    </li>

                                )

                            )

                        }

                    </ul>

                </div>

                <div className="feedback-box weaknesses">

                    <h3>

                        📈 Areas to Improve

                    </h3>

                    <ul>

                        {

                            evaluation.weaknesses.map(

                                (item:string)=>(

                                    <li key={item}>

                                        {item}

                                    </li>

                                )

                            )

                        }

                    </ul>

                </div>

            </div>

            <div className="ai-feedback">

                <h3>

                    💡 AI Recommendation

                </h3>

                <p>

                    {evaluation.feedback}

                </p>

            </div>

            <div className="next-topic">

                <strong>

                    🎯 Recommended Next Topic

                </strong>

                <p>

                    {evaluation.next_topic}

                </p>

            </div>

        </div>

    );

}