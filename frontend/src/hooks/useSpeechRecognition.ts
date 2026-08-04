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

    const finalTranscriptRef = useRef("");

    const silenceTimerRef = useRef<any>(null);

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

        recognition.continuous = false;

        recognition.interimResults = true;

        recognition.maxAlternatives = 1;

        recognition.onstart = () => {

            setListening(true);

            setTranscript("");

            finalTranscriptRef.current = "";

        };

        recognition.onresult = (event: any) => {

            let interim = "";

            let finalText = finalTranscriptRef.current;

            for (

                let i = event.resultIndex;

                i < event.results.length;

                i++

            ) {

                const result = event.results[i];

                if (result.isFinal) {

                    finalText += result[0].transcript + " ";

                } else {

                    interim += result[0].transcript;

                }

            }

            finalTranscriptRef.current = finalText;

            setTranscript(

                (finalText + interim).trim()

            );

            if (silenceTimerRef.current) {

                clearTimeout(

                    silenceTimerRef.current

                );

            }

            silenceTimerRef.current = setTimeout(() => {

                recognition.stop();

            }, 1200);

        };

        recognition.onerror = (event: any) => {

            console.error(

                "Speech Recognition:",

                event.error

            );

            setListening(false);

        };

        recognition.onend = () => {

            setListening(false);

            if (

                silenceTimerRef.current

            ) {

                clearTimeout(

                    silenceTimerRef.current

                );

            }

            const finalText =

finalTranscriptRef.current.trim()

||

transcript.trim();

            if (

                finalText &&

                onFinished

            ) {

                onFinished(finalText);

            }

        };

        recognitionRef.current = recognition;

    }, []);

    function startListening() {

        try {

            recognitionRef.current?.start();

        }

        catch (e) {

            console.log(

                "Recognition already started."

            );

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