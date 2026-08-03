import { useInterview } from "../../../context/InterviewContext";

import AnswerBox from "../AnswerBox/AnswerBox";
import VoiceAnswerBox from "../VoiceAnswerBox/VoiceAnswerBox";

import "./InterviewInput.css";


interface Props{

    answer:string;

    setAnswer:(value:string)=>void;

}


export default function InterviewInput({

    answer,

    setAnswer

}:Props){


    const{

        interviewMode

    }=useInterview();



    return (

        <div className="interview-input">


        {

            interviewMode==="voice"

            ?

            <VoiceAnswerBox

                answer={answer}

                setAnswer={setAnswer}

            />

            :

            <AnswerBox

                answer={answer}

                setAnswer={setAnswer}

            />

        }


        </div>

    );

}