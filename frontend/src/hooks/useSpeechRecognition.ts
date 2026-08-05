import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export function useSpeechRecognition(
    onFinished?: (text: string) => void,
    onRecognitionEnded?: ()=>void

) {

    const recognitionRef = useRef<any>(null);

    const finalTranscriptRef = useRef("");

    const [transcript, setTranscript] = useState("");

    const [listening, setListening] = useState(false);

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.warn(
                "Speech Recognition is not supported."
            );

            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.maxAlternatives = 1;

        recognition.onstart = () => {

            setListening(true);

            setTranscript("");

            finalTranscriptRef.current = "";

        };

        recognition.onresult = (event: any) => {

            let interim = "";

            let finalText = "";

            for (

                let i = 0;

                i < event.results.length;

                i++

            ) {

                const result = event.results[i];

                if (result.isFinal) {

                    finalText += result[0].transcript + " ";

                }

                else {

                    interim += result[0].transcript + " ";

                }

            }

            finalTranscriptRef.current = finalText.trim();

            setTranscript(

                (finalText + interim).trim()

            );

        };

        recognition.onerror = (event: any) => {

            console.error(

                "Speech Recognition:",

                event.error

            );

            setListening(false);

        };

        recognition.onend=()=>{

    setListening(false);

    const finalText=

        finalTranscriptRef.current.trim();

    if(

        finalText &&

        onFinished

    ){

        onFinished(finalText);

    }

    if(

        onRecognitionEnded

    ){

        onRecognitionEnded();

    }

}

        recognitionRef.current = recognition;

        return () => {

            recognition.stop();

        };

    }, [onFinished]);

    function startListening() {

        try {

            recognitionRef.current?.start();

        }

        catch {

            // already started

        }

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