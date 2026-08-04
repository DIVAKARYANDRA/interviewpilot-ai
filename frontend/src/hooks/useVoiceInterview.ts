import { useEffect } from "react";

import { useInterview } from "../context/InterviewContext";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { speak } from "./useSpeech";

import { greetingMessage } from "../constants/interviewGreeting";

export default function useVoiceInterview(

    onSubmit:()=>void

){

    const{

        interviewMode,

        question,

        answer,

        setAnswer,

        stage,

        recruiterState,

        setRecruiterState

    } = useInterview();

    const{

        transcript,

        startListening

    } = useSpeechRecognition(

        (text)=>{

            setAnswer(text);

        }

    );

    /*
    ------------------------
    Live Transcript
    ------------------------
    */

    useEffect(()=>{

        if(transcript){

            setAnswer(transcript);

        }

    },[transcript]);

    /*
    ------------------------
    AI Speech
    ------------------------
    */

    useEffect(()=>{

        if(interviewMode!=="voice"){

            return;

        }

        const text =

            stage==="greeting"

            ?

            greetingMessage

            :

            question;

        if(!text){

            return;

        }

        setRecruiterState("speaking");

        window.speechSynthesis.cancel();

        speak(

            text,

            ()=>{

                if(stage==="interview"){

                    setRecruiterState(

                        "listening"

                    );

                    startListening();

                }

                else{

                    setRecruiterState(

                        "idle"

                    );

                }

            }

        );

        return()=>{

            window.speechSynthesis.cancel();

        };

    },[

        question,

        stage,

        interviewMode

    ]);

    useEffect(()=>{

    if(interviewMode!=="voice"){

        return;

    }

    if(!answer.trim()){

        return;

    }

    const timer=setTimeout(()=>{

        onSubmit();

    },2500);

    return()=>clearTimeout(timer);

},[answer]);

 

    return{

        transcript,

        recruiterState

    };

}