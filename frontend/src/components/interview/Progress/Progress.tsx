import "./Progress.css";

import { useInterview } from "../../../context/InterviewContext";

export default function Progress() {

    const {

        currentQuestion,

        totalQuestions

    } = useInterview();


    const percentage =

        (currentQuestion / totalQuestions) * 100;


    const remainingQuestions =

        totalQuestions - currentQuestion;


    const estimatedMinutes =

        Math.max(1, remainingQuestions);


    return (

        <div className="progress-container">


            <div className="progress-top">


                <div>

                    <h3>

                        AI Technical Interview

                    </h3>

                    <p>

                        Question {currentQuestion} of {totalQuestions}

                    </p>

                </div>


                <div className="progress-percentage">

                    {Math.round(percentage)}%

                </div>


            </div>



            <div className="progress-track">


                <div

                    className="progress-fill"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>



            <div className="progress-bottom">

                <span>

                    Estimated remaining:
                    {" "}
                    {estimatedMinutes}
                    {" "}
                    min

                </span>

                <span>

                    {remainingQuestions}
                    {" "}
                    questions left

                </span>

            </div>


        </div>

    );

}