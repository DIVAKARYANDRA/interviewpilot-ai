import { useEffect, useRef } from "react";

import { useInterview } from "../context/InterviewContext";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { speak } from "./useSpeech";

import { greetingMessage } from "../constants/interviewGreeting";

export default function useVoiceInterview(
        onSubmit:(answer:string)=>void

) {

    const {

        interviewMode,

        question,

        stage,

        setAnswer,

        setRecruiterState

    } = useInterview();

    const submittedRef = useRef(false);

    const {

        transcript,

        startListening

    } = useSpeechRecognition(

        (finalText) => {

            if (!finalText.trim()) {

                return;

            }

            if (submittedRef.current) {

                return;

            }

            submittedRef.current = true;

            setRecruiterState("thinking");

            setAnswer(finalText);

            setTimeout(() => {

    onSubmit(finalText);

},300);

        }

    );

    /*
    -----------------------------
    Live Transcript
    -----------------------------
    */

    useEffect(() => {

        setAnswer(transcript);

    }, [transcript]);

    /*
    -----------------------------
    AI Voice
    -----------------------------
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

        setRecruiterState("speaking");

        speak(

            text,

            () => {

                setRecruiterState("listening");

                startListening();

            }

        );

    }, [

        question,

        stage,

        interviewMode

    ]);

}