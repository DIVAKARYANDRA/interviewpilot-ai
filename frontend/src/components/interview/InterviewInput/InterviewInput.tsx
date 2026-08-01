import { useInterview } from "../../../context/InterviewContext";

import AnswerBox from "../AnswerBox/AnswerBox";
import VoiceAnswerBox from "../VoiceAnswerBox/VoiceAnswerBox";

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

    if(interviewMode==="voice"){

        return(

            <VoiceAnswerBox

                answer={answer}

                setAnswer={setAnswer}

            />

        );

    }

    return(

        <AnswerBox

            answer={answer}

            setAnswer={setAnswer}

        />

    );

}