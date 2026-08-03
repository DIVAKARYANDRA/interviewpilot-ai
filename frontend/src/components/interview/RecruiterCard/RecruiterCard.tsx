import "./RecruiterCard.css";

interface Props{

    state:

    | "idle"

    | "speaking"

    | "listening";

    company:string;

    question:string;

}

export default function RecruiterCard({

    speaking,

    company,

    question

}:Props){

    return(

        <section className="recruiter-card">

            <div

                className={

`recruiter-avatar ${state}`

}

            >

                <img

    src="/recruiter.png"

    alt="AI Recruiter"

    className="recruiter-image"

/>

            </div>

            <h2>

                Sarah Johnson

            </h2>

            <p className="status">

{

state==="speaking"

?

"🎙 Speaking..."

:

state==="listening"

?

"🎤 Listening..."

:

"Waiting..."

}

</p>
            <span>

                {company}

            </span>

            <div className="question-banner">

                {question}

            </div>

        </section>

    );

}