import { useEffect, useRef } from "react";

import { useInterview } from "../context/InterviewContext";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { speak } from "./useSpeech";

import { greetingMessage } from "../constants/interviewGreeting";

export default function useVoiceInterview(
    onSubmit: (answer: string) => void
) {

    const {

        interviewMode,
        question,
        stage,
        setAnswer,
        setRecruiterState

    } = useInterview();

    const submittedRef = useRef(false);

    

    const keepListeningRef = useRef(false);

    const silenceTimer = useRef<NodeJS.Timeout | null>(null);

    const answerTimer = useRef<NodeJS.Timeout | null>(null);

    const latestTranscript = useRef("");

    const {

        transcript,
        startListening,
        stopListening

    } = useSpeechRecognition(

(finalText)=>{

    latestTranscript.current = finalText;

    setAnswer(finalText);

},

()=>{

    if(

        keepListeningRef.current &&

        !submittedRef.current

    ){

        setTimeout(()=>{

            startListening();

        },300);

    }

}
);

    /*
    --------------------------------
    Live transcript
    --------------------------------
    */

    useEffect(() => {

        if (!transcript) return;

        latestTranscript.current = transcript;

        setAnswer(transcript);

        if (submittedRef.current) return;

        if (silenceTimer.current) {

            clearTimeout(silenceTimer.current);

        }

        silenceTimer.current = setTimeout(() => {

            if (submittedRef.current) return;

            submittedRef.current = true;

            keepListeningRef.current=false;

            stopListening();

            setRecruiterState("thinking");

            if (answerTimer.current) {

                clearTimeout(answerTimer.current);

            }

            onSubmit(latestTranscript.current);

        }, 10000);

    }, [transcript]);

    /*
    --------------------------------
    AI Speaking
    --------------------------------
    */

    useEffect(() => {

        if (interviewMode !== "voice") {

            return;

        }

        const text =

            stage === "greeting"

                ? greetingMessage

                : question;

        if (!text) {

            return;

        }

        submittedRef.current = false;

        keepListeningRef.current=false;

        latestTranscript.current = "";

        setAnswer("");

        if (silenceTimer.current) {

            clearTimeout(silenceTimer.current);

        }

        if (answerTimer.current) {

            clearTimeout(answerTimer.current);

        }

        setRecruiterState("speaking");

        speak(

            text,

            () => {

                keepListeningRef.current = true;

                setRecruiterState("listening");

                startListening();

                answerTimer.current = setTimeout(() => {

                    if (submittedRef.current) return;

                    submittedRef.current = true;

                    stopListening();

                    setRecruiterState("thinking");

                    if (silenceTimer.current) {

                        clearTimeout(silenceTimer.current);

                    }

                    onSubmit(latestTranscript.current);

                }, 120000);

            }

        );

        return () => {

            if (silenceTimer.current) {

                clearTimeout(silenceTimer.current);

            }

            if (answerTimer.current) {

                clearTimeout(answerTimer.current);

            }

        };

    }, [

        question,
        stage,
        interviewMode

    ]);

}