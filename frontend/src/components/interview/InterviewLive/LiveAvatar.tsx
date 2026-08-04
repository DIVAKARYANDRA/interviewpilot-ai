import "./LiveAvatar.css";

interface Props{

    recruiterState:
        |"idle"
        |"speaking"
        |"listening"
        |"thinking";

}

export default function LiveAvatar({

    recruiterState

}:Props){

    return(

        <div className="live-avatar">

            <div className={`avatar-circle ${recruiterState}`}>

                <div className="ring ring1"></div>

                <div className="ring ring2"></div>

                <div className="ring ring3"></div>

                <img

                    src="/recruiter.png"

                    alt="Recruiter"

                />

            </div>

            <h2>

                Divakar AI

            </h2>

            <p>

                Senior Technical Interviewer

            </p>

           <div className={`state ${recruiterState}`}>

    {

        recruiterState==="speaking"

        ?

        "🗣 AI Speaking"

        :

        recruiterState==="thinking"

        ?

        "🤔 Thinking..."

        :

        recruiterState==="listening"

        ?

        "🎤 Listening"

        :

        "💤 Waiting"

    }

</div>

        </div>

    );

}