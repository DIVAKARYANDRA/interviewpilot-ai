import { useEffect, useRef, useState } from "react";

declare global {

    interface Window {

        webkitSpeechRecognition: any;

        SpeechRecognition: any;

    }

}

export function useSpeechRecognition(

    onFinished?: (text: string) => void

) {

    const recognitionRef = useRef<any>(null);

    const transcriptRef = useRef("");

    const [listening, setListening] = useState(false);

    const [transcript, setTranscript] = useState("");

    useEffect(() => {

        const SpeechRecognition =

            window.SpeechRecognition ||

            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.warn(

                "Speech Recognition is not supported in this browser."

            );

            return;

        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.continuous = false;

        recognition.interimResults = false;

        recognition.maxAlternatives = 1;

        recognition.onstart = () => {

            setListening(true);

            setTranscript("");

            transcriptRef.current = "";

        };

        recognition.onresult = (event: any) => {

            const text =

                event.results[0][0].transcript;

            transcriptRef.current = text;

            setTranscript(text);

        };

        recognition.onerror = (event: any) => {

            console.error(

                "Speech Recognition Error:",

                event.error

            );

            setListening(false);

        };

        recognition.onend = () => {

            setListening(false);

            const finalTranscript =

                transcriptRef.current.trim();

            if (

                finalTranscript &&

                onFinished

            ) {

                onFinished(finalTranscript);

            }

        };

        recognitionRef.current = recognition;

    }, [onFinished]);

    function startListening() {

        recognitionRef.current?.start();

    }

    function stopListening() {

        recognitionRef.current?.stop();

    }

    return {

        transcript,

        listening,

        startListening,

        stopListening,

        setTranscript

    };

}