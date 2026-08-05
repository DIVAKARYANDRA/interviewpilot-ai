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
    const hasStartedSpeakingRef = useRef(false);
    const restartingRef = useRef(false);

    const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const maxAnswerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const noResponseTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null);

    const latestTranscript = useRef("");

    function clearTimers() {

    if (silenceTimer.current)
        clearTimeout(silenceTimer.current);

    if (maxAnswerTimer.current)
        clearTimeout(maxAnswerTimer.current);

    if (noResponseTimer.current)
        clearTimeout(noResponseTimer.current);

}

    function submitAnswer() {
        if (submittedRef.current) return;

        submittedRef.current = true;
        keepListeningRef.current = false;

        clearTimers();
        stopListening();

        setRecruiterState("thinking");

        const answer =
            latestTranscript.current.trim() ||
            "Candidate skipped this question.";

        onSubmit(answer);
    }

    function startSilenceTimer() {
        if (silenceTimer.current) clearTimeout(silenceTimer.current);

        silenceTimer.current = setTimeout(() => {
            submitAnswer();
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
                !keepListeningRef.current ||
                submittedRef.current ||
                restartingRef.current
            ) {
                return;
            }

            restartingRef.current = true;

            setTimeout(() => {
                restartingRef.current = false;

                if (
                    keepListeningRef.current &&
                    !submittedRef.current
                ) {
                    try {
                        startListening();
                    } catch {}
                }
            }, 1000);
        }
    );

    useEffect(() => {
        latestTranscript.current = transcript;
        setAnswer(transcript);

        if (!transcript.trim()) return;

        if (noResponseTimer.current) {
    clearTimeout(noResponseTimer.current);
}

        hasStartedSpeakingRef.current = true;
        startSilenceTimer();

    }, [transcript]);

    useEffect(() => {

        if (interviewMode !== "voice") return;
        if (!question) return;

        submittedRef.current = false;
        keepListeningRef.current = false;
        hasStartedSpeakingRef.current = false;
        restartingRef.current = false;

        latestTranscript.current = "";
        setAnswer("");

        clearTimers();

        setRecruiterState("speaking");

        speak(question, () => {

            keepListeningRef.current = true;

            setRecruiterState("listening");

            startListening();

            noResponseTimer.current = setTimeout(() => {

    if (
        submittedRef.current ||
        hasStartedSpeakingRef.current
    ) {
        return;
    }

    submitAnswer();

}, 20000);

            maxAnswerTimer.current = setTimeout(() => {
                submitAnswer();
            }, 120000);

        });

        return () => {
            keepListeningRef.current = false;
            clearTimers();
            stopListening();
        };

    }, [question, interviewMode]);
}
