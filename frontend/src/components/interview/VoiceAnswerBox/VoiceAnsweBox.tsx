import { useEffect } from "react";

import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";

interface Props {

    answer: string;

    setAnswer: (value: string) => void;

}

export default function VoiceAnswerBox({

    answer,

    setAnswer

}: Props) {

    const {

        transcript,

        isListening,

        startListening,

        stopListening

    } = useSpeechRecognition();

    useEffect(() => {

        if (transcript) {

            setAnswer(transcript);

        }

    }, [transcript, setAnswer]);

    return (

        <div>

            <textarea

                rows={8}

                value={answer}

                readOnly

            />

            <br />

            <button

                onClick={

                    isListening

                        ? stopListening

                        : startListening

                }

            >

                {

                    isListening

                        ?

                        "🛑 Stop Listening"

                        :

                        "🎤 Start Speaking"

                }

            </button>

        </div>

    );

}