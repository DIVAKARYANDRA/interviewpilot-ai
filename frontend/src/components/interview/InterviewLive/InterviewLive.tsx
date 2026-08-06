import { useEffect, useState } from "react";
import "./InterviewLive.css";
import LiveAvatar from "./LiveAvatar";
import LiveTranscript from "./LiveTranscript";
import LiveFooter from "./LiveFooter";
import { useInterview }
from "../../../context/InterviewContext";

interface Props{

    muted?:boolean;

    onToggleMute?:()=>void;

    onEndInterview?:()=>void;

}

// Presentational elapsed-time display only — does not affect interview
// timing/business logic, which lives entirely in useVoiceInterview.
function useElapsedTime(){

    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{

        const interval = setInterval(()=>{

            setSeconds(s => s + 1);

        }, 1000);

        return ()=> clearInterval(interval);

    }, []);

    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${mins}:${secs}`;

}

export default function InterviewLive({

    muted,

    onToggleMute,

    onEndInterview

}:Props){

    const{

question,

answer,

currentQuestion,

totalQuestions,

recruiterState

}=useInterview();

    const elapsed = useElapsedTime();

    return (

        <div className="live-interview">

            <div className="live-header">

                <div className="live-header-title">

                    <h2>InterviewPilot Live</h2>

                    <small>Amazon Backend Engineer Interview</small>

                </div>

                <div className="live-header-meta">

                    <div className="live-timer">

                        {elapsed}

                    </div>

                    <div className="live-badge">

                        <span className="live-dot" />
                        LIVE

                    </div>

                </div>

            </div>

            <div className="live-body">

                <LiveAvatar

                    recruiterState={recruiterState}

                />

                <LiveTranscript

                    answer={answer}

                    micActive={recruiterState==="listening"}

                />

            </div>

            <LiveFooter

                current={currentQuestion}

                total={totalQuestions}

                recruiterState={recruiterState}

                question={question}

                muted={muted}

                onToggleMute={onToggleMute}

                onEndInterview={onEndInterview}

            />

        </div>

    );

}
