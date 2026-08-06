import { Bot, Code2, MessageCircle, Rocket, CheckCircle2, TrendingUp, Lightbulb, Target } from "lucide-react";
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

                <div className="evaluation-header-title">

                    <span className="evaluation-icon">
                        <Bot size={18} />
                    </span>

                    <div>

                        <h2>

                            AI Performance Feedback

                        </h2>

                        <p>

                            Here's how you performed in this question.

                        </p>

                    </div>

                </div>

                <div className="eval-overall-score">

                    {overall}
                    <span>/100</span>

                </div>

            </div>

            <div className="eval-score-grid">

                <div className="eval-score-mini">

                    <Code2 size={16} />

                    <h4>

                        Technical

                    </h4>

                    <h3>

                        {evaluation.technical_score}

                    </h3>

                </div>

                <div className="eval-score-mini">

                    <MessageCircle size={16} />

                    <h4>

                        Communication

                    </h4>

                    <h3>

                        {evaluation.communication_score}

                    </h3>

                </div>

                <div className="eval-score-mini">

                    <Rocket size={16} />

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

                        <CheckCircle2 size={15} />
                        Strengths

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

                        <TrendingUp size={15} />
                        Areas to Improve

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

                    <Lightbulb size={15} />
                    AI Recommendation

                </h3>

                <p>

                    {evaluation.feedback}

                </p>

            </div>

            <div className="next-topic">

                <strong>

                    <Target size={14} />
                    Recommended Next Topic

                </strong>

                <p>

                    {evaluation.next_topic}

                </p>

            </div>

        </div>

    );

}
