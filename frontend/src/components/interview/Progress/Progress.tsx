import "./Progress.css";

import { useInterview } from "../../../context/InterviewContext";

export default function Progress() {

    const {

        currentQuestion,

        totalQuestions

    } = useInterview();

    const percentage =

        (currentQuestion / totalQuestions) * 100;

    return (

        <div>

            <p>

                Question {currentQuestion} of {totalQuestions}

            </p>

            <div className="progress-track">

                <div

                    className="progress-fill"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

        </div>

    );

}