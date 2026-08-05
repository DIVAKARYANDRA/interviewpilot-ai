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

    const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const answerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const latestTranscript = useRef("");

    function submitCurrentAnswer() {

        if (submittedRef.current) return;

        submittedRef.current = true;
        keepListeningRef.current = false;

        stopListening();

        if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
        }

        if (answerTimer.current) {
            clearTimeout(answerTimer.current);
        }

        setRecruiterState("thinking");

        onSubmit(latestTranscript.current);

    }

    function restartSilenceTimer() {

        if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
        }

        silenceTimer.current = setTimeout(() => {

            submitCurrentAnswer();

        }, 5000);

    }

    const {
        transcript,
        startListening,
        stopListening
    } = useSpeechRecognition(

        (finalText) => {

            latestTranscript.current = finalText;
            setAnswer(finalText);

        },

        () => {

            if (
                keepListeningRef.current &&
                !submittedRef.current
            ) {

                setTimeout(() => {

                    if (
                        keepListeningRef.current &&
                        !submittedRef.current
                    ) {

                        startListening();

                    }

                }, 1000);

            }

        }

    );

    /*
    ------------------------------------
    Live Transcript
    ------------------------------------
    */

    useEffect(() => {

        latestTranscript.current = transcript;

        setAnswer(transcript);

        if (!submittedRef.current) {

            restartSilenceTimer();

        }

    }, [transcript]);

    /*
    ------------------------------------
    AI Speaking
    ------------------------------------
    */

    useEffect(() => {

        if (interviewMode !== "voice") {

            return;

        }

        const text =

            stage === "greeting"

                ? greetingMessage

                : question;

        if (!text) return;

        submittedRef.current = false;
        keepListeningRef.current = false;

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

                /*
                Candidate says NOTHING
                ↓
                Auto move after 5 sec
                */

                restartSilenceTimer();

                /*
                Max answer time
                */

                answerTimer.current = setTimeout(() => {

                    submitCurrentAnswer();

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