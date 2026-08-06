import { Mic, MicOff, User } from "lucide-react";
import "./LiveTranscript.css";
import SpeakingWave from "../SpeakingWave/SpeakingWave";

interface Props{

    answer:string;

    micActive:boolean;

}

export default function LiveTranscript({

    answer,

    micActive

}:Props){

    const isSpeaking = micActive && answer.trim().length > 0;

    return(

        <div className="video-tile candidate-tile">

            <div className="tile-label">

                <span className="tile-role-badge">You</span>
            </div>

            <div className="candidate-body">

                <div className={`candidate-avatar ${isSpeaking ? "speaking" : ""}`}>

                    <User size={40} />

                </div>

                <div className={`mic-indicator ${micActive ? "active" : "muted"}`}>

                    {

                        micActive

                        ?

                        <Mic size={14} />

                        :

                        <MicOff size={14} />

                    }

                    {

                        micActive

                        ?

                        "Mic Live"

                        :

                        "Mic Off"

                    }

                </div>

                <div className="candidate-visual">

                    {

                        isSpeaking

                        &&

                        <SpeakingWave />

                    }

                </div>

            </div>

            <div className="live-transcript-box">

                <span className="transcript-label">Live Transcript</span>

                <p className={answer ? "" : "placeholder"}>

                    {

                        answer ||

                        (

                            micActive

                            ?

                            "Listening for your response..."

                            :

                            "Waiting to start listening..."

                        )

                    }

                </p>

            </div>

        </div>

    );

}
