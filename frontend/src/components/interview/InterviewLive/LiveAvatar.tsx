import { Mic, Brain, Volume2, Moon } from "lucide-react";
import "./LiveAvatar.css";
import SpeakingWave from "../SpeakingWave/SpeakingWave";
import ThinkingIndicator from "../ThinkingIndicator/ThinkingIndicator";

interface Props{

    recruiterState:
        |"idle"
        |"speaking"
        |"listening"
        |"thinking";

}

const STATE_CONFIG = {
    speaking: { icon: Volume2, label: "AI Speaking" },
    listening: { icon: Mic, label: "Listening" },
    thinking: { icon: Brain, label: "Thinking" },
    idle: { icon: Moon, label: "Waiting" },
};

export default function LiveAvatar({

    recruiterState

}:Props){

    const { icon: StateIcon, label } = STATE_CONFIG[recruiterState];

    return(

        <div className="video-tile recruiter-tile">

            <div className="tile-label">

                <span className="tile-role-badge">Interviewer</span>

            </div>

            <div className="live-avatar">

                <div className={`avatar-circle ${recruiterState}`}>

                    <div className="ring ring1"></div>
                    <div className="ring ring2"></div>
                    <div className="ring ring3"></div>

                    <img

                        src="/recruiter.jpg"

                        alt="AI recruiter avatar"

                    />

                </div>

                <h2>

                    Divakar AI

                </h2>

                <p>

                    Senior Technical Interviewer

                </p>

                <div className={`state-pill ${recruiterState}`}>

                    <StateIcon size={13} />
                    {label}

                </div>

                <div className="avatar-visual">

                    {

                        recruiterState === "speaking"

                        &&

                        <SpeakingWave />

                    }

                    {

                        recruiterState === "thinking"

                        &&

                        <ThinkingIndicator />

                    }

                </div>

            </div>

        </div>

    );

}
