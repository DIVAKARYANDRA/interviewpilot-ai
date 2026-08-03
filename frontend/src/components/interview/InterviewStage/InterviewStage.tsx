import "./InterviewStage.css";
import TypewriterSpeech
from "../../common/TypewriterSpeech/TypewriterSpeech";

interface Props{

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

            <div className={`stage-avatar ${state}`}>

                <img

                    src="/recruiter.png"

                    alt="Recruiter"

                />

            </div>

            <h2>

                {recruiterName}

            </h2>

            <p>

                {recruiterTitle}

            </p>

            <small>

                {company}

            </small>

            <div className="stage-message">

                <TypewriterSpeech

text={message}

/>

            </div>

            <div className="stage-status">

                {

                    state==="speaking"

?

"🎙 AI Speaking"

:

state==="listening"

?

"🎤 Listening"

:

state==="thinking"

?

"🧠 Preparing next question..."

:

"Waiting..."

                }

            </div>

        </section>

    );

}