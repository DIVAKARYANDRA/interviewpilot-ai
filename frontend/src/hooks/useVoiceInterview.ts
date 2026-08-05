import { useEffect, useRef } from "react";

import { useInterview } from "../context/InterviewContext";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { speak } from "./useSpeech";

export default function useVoiceInterview(
    onSubmit: (answer: string) => void
) {

    const {
        interviewMode,
        question,
        setAnswer,
        setRecruiterState
    } = useInterview();

    const submittedRef = useRef(false);
    const keepListeningRef = useRef(false);

    const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const answerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const firstResponseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

        if (firstResponseTimer.current) {
    clearTimeout(firstResponseTimer.current);
}

        setRecruiterState("thinking");

        const finalAnswer =
    latestTranscript.current.trim() ||
    "Candidate skipped this question.";

        onSubmit(finalAnswer);

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

    if (!transcript.trim()) {
        return;
    }

    // User has started speaking, so cancel the initial wait timer
    if (firstResponseTimer.current) {
        clearTimeout(firstResponseTimer.current);
    }

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

        const text = question;

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

        if (firstResponseTimer.current) {
    clearTimeout(firstResponseTimer.current);
}

        setRecruiterState("speaking");

        speak(

            text,

            () => {

                keepListeningRef.current = true;

                setRecruiterState("listening");

                startListening();

// Candidate has 5 seconds to begin speaking
firstResponseTimer.current = setTimeout(() => {

    if (
        submittedRef.current ||
        latestTranscript.current.trim()
    ) {
        return;
    }

    submitCurrentAnswer();

}, 5000);

// Maximum answer duration
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
        interviewMode

    ]);

}