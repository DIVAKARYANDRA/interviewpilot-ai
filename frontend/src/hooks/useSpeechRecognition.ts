import { useEffect, useRef, useState } from "react";

declare global {

    interface Window {

        SpeechRecognition: any;

        webkitSpeechRecognition: any;

    }

}

export function useSpeechRecognition() {

    const recognitionRef = useRef<any>(null);

    const [isListening, setIsListening] = useState(false);

    const [transcript, setTranscript] = useState("");

    useEffect(() => {

        const SpeechRecognition =

            window.SpeechRecognition ||

            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.warn(
                "Speech Recognition not supported."
            );

            return;

        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.continuous = false;

        recognition.interimResults = true;

        recognition.onstart = () => {

            setIsListening(true);

        };

        recognition.onend = () => {

            setIsListening(false);

        };

        recognition.onresult = (event: any) => {

            let finalTranscript = "";

            for (

                let i = 0;

                i < event.results.length;

                i++

            ) {

                finalTranscript +=

                    event.results[i][0].transcript;

            }

            setTranscript(finalTranscript);

        };

        recognitionRef.current = recognition;

    }, []);

    function startListening() {

        recognitionRef.current?.start();

    }

    function stopListening() {

        recognitionRef.current?.stop();

    }

    return {

        transcript,

        isListening,

        startListening,

        stopListening

    };

}