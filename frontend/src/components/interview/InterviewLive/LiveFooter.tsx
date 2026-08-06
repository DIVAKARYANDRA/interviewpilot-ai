import { Mic, MicOff, PhoneOff } from "lucide-react";
import "./LiveFooter.css";

interface Props{

current:number;

total:number;

recruiterState:
"idle"
|"speaking"
|"thinking"
|"listening";

question?:string;

muted?:boolean;

onToggleMute?:()=>void;

onEndInterview?:()=>void;

}

export default function LiveFooter({

current,

total,

recruiterState,

question,

muted,

onToggleMute,

onEndInterview

}:Props){

const progress = total > 0 ? (current/total)*100 : 0;

return(

<div className="live-footer-bar">

    {

        question

        &&

        <div className="current-question-banner">

            <span className="question-eyebrow">

                Question {current} of {total}

            </span>

            <p>

                {question}

            </p>

        </div>

    }

    <div className="footer-controls-row">

        <div className="progress-section">

            <div className="live-progress-track">

                <div

                    className="live-progress-fill"

                    style={{

                        width:`${progress}%`

                    }}

                />

            </div>

        </div>

        <div className="voice-chip-wrapper">

            <div className={`voice-chip ${recruiterState}`}>

                {

                    recruiterState==="speaking"

                    &&

                    "AI Speaking"

                }

                {

                    recruiterState==="listening"

                    &&

                    "Listening"

                }

                {

                    recruiterState==="thinking"

                    &&

                    "Thinking"

                }

                {

                    recruiterState==="idle"

                    &&

                    "Waiting"

                }

            </div>

        </div>

        {

            (onToggleMute || onEndInterview)

            &&

            <div className="meeting-controls">

                {

                    onToggleMute

                    &&

                    <button

                        type="button"

                        className={`control-btn ${muted ? "muted" : ""}`}

                        onClick={onToggleMute}

                        aria-pressed={muted}

                        aria-label={

                            muted

                            ?

                            "Unmute microphone"

                            :

                            "Mute microphone"

                        }

                    >

                        {

                            muted

                            ?

                            <MicOff size={17} />

                            :

                            <Mic size={17} />

                        }

                        {

                            muted

                            ?

                            "Unmute"

                            :

                            "Mute"

                        }

                    </button>

                }

                {

                    onEndInterview

                    &&

                    <button

                        type="button"

                        className="control-btn end-btn"

                        onClick={onEndInterview}

                        aria-label="End interview"

                    >

                        <PhoneOff size={17} />

                        End Interview

                    </button>

                }

            </div>

        }

    </div>

</div>

);

}
