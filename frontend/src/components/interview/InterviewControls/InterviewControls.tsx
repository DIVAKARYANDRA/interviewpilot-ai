import { Mic, Loader2 } from "lucide-react";
import "./InterviewControls.css";

interface Props{

    onSubmit:()=>void;

    loading:boolean;

    voiceMode:boolean;

}

export default function InterviewControls({

    onSubmit,

    loading,

    voiceMode

}:Props){

    if(voiceMode){

        return(

            <div className="voice-controls">

                <div className="voice-indicator">

                    <Mic size={15} />
                    Voice Interview Active

                </div>

                <small>

                    Speak naturally.
                    Your answer will be submitted automatically.

                </small>

            </div>

        );

    }

    return(

        <div className="interview-controls">

            <button

                className="submit-btn"

                onClick={onSubmit}

                disabled={loading}

            >

                {

                    loading

                    ?

                    <>
                        <Loader2 size={16} className="spin-icon" />
                        Thinking...
                    </>

                    :

                    "Next Question"

                }

            </button>

        </div>

    );

}