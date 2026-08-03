import Card from "../../common/Card/Card";

import "./QuestionCard.css";


interface Props {

    question:string;

}


export default function QuestionCard({

    question

}:Props){


    return (

        <Card className="question-card">


            <div className="question-header">


                <span>
                    🤖
                </span>


                <h3>
                    AI Interviewer
                </h3>


            </div>



            <p className="question-label">

                Interview Question

            </p>



            <p className="question-text">

                {question}

            </p>


        </Card>

    );

}