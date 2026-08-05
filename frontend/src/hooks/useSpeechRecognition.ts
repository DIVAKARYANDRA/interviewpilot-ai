import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export function useSpeechRecognition(
    onFinished?: (text: string) => void,
    onRecognitionEnded?: () => void
) {
    const recognitionRef = useRef<any>(null);
    const finalTranscriptRef = useRef("");
    const isRunningRef = useRef(false);

    const [transcript, setTranscript] = useState("");
    const [listening, setListening] = useState(false);

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Speech Recognition is not supported.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log("🎤 Recognition Started");
            isRunningRef.current = true;
            setListening(true);
            finalTranscriptRef.current = "";
        };

        recognition.onresult = (event: any) => {

            let finalText = finalTranscriptRef.current;
            let interim = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {

                const result = event.results[i];

                if (result.isFinal) {
                    finalText += result[0].transcript + " ";
                } else {
                    interim += result[0].transcript;
                }
            }

            finalTranscriptRef.current = finalText.trim();
            setTranscript((finalText + interim).trim());
        };

        recognition.onerror = (event: any) => {
            console.log("❌ Speech Error:", event.error);

            if (
                event.error === "no-speech" ||
                event.error === "aborted" ||
                event.error === "network"
            ) {
                // allow onend to restart
            }

            isRunningRef.current = false;
            setListening(false);
        };

        recognition.onend = () => {

            console.log("🔴 Recognition Ended");

            isRunningRef.current = false;
            setListening(false);

            const finalText = finalTranscriptRef.current.trim();

            if (finalText && onFinished) {
                onFinished(finalText);
            }

            if (onRecognitionEnded) {
                onRecognitionEnded();
            }
        };

        recognitionRef.current = recognition;

        return () => {
            try {
                recognition.stop();
            } catch {}
        };

    }, []);

    function startListening() {

        if (isRunningRef.current) {
            return;
        }

        try {
            recognitionRef.current?.start();
        } catch {}
    }

    function stopListening() {

        isRunningRef.current = false;

        try {
            recognitionRef.current?.stop();
        } catch {}
    }

    return {
        transcript,
        listening,
        startListening,
        stopListening,
        setTranscript
    };
}
