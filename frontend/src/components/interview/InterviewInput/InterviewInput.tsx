import AnswerBox from "../AnswerBox/AnswerBox";

import "./InterviewInput.css";


interface Props{

    answer:string;

    setAnswer:(value:string)=>void;

}


// Only ever mounted by TextInterview (voice mode uses InterviewLive instead),
// so this always renders the text answer box.
export default function InterviewInput({

    answer,

    setAnswer

}:Props){

    return (

        <div className="interview-input">

            <AnswerBox

                answer={answer}

                setAnswer={setAnswer}

            />

        </div>

    );

}