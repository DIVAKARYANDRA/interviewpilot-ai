import "./InterviewStage.css";
import TypewriterSpeech from "../../common/TypewriterSpeech/TypewriterSpeech";
import SpeakingWave
from "../SpeakingWave/SpeakingWave";
import ThinkingIndicator
from "../ThinkingIndicator/ThinkingIndicator";

interface Props {

    recruiterName:string;

    recruiterTitle:string;

    company:string;

    state:
        |"idle"
        |"speaking"
        |"listening"
        |"thinking";

    message:string;

}

export default function InterviewStage({

    recruiterName,

    recruiterTitle,

    company,

    state,

    message

}:Props){

    return(

        <section className="interview-stage">

            <div className={`avatar-wrapper ${state}`}>

                <div className="ring ring1"></div>

                <div className="ring ring2"></div>

                <div className="ring ring3"></div>

                <img
                    src="/recruiter.jpg"
                    alt="Recruiter"
                    className="recruiter-avatar"
                />

            </div>

            <h2>{recruiterName}</h2>

            <p>{recruiterTitle}</p>

            <small>{company}</small>

            <div className="stage-message">

                {

state==="thinking"

?

<ThinkingIndicator/>

:

<TypewriterSpeech

text={message}

/>

}

            </div>

        <div className={`stage-state ${state}`}>

{

state==="speaking"

?

<>

<div>

🗣 Speaking

</div>

<SpeakingWave/>

</>

:

state==="listening"

?

"🎤 Listening"

:

state==="thinking"

?

"🤔 Thinking..."

:

"Waiting"

}

</div>


        </section>

    );

}