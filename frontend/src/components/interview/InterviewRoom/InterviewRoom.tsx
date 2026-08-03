import "./InterviewRoom.css";

interface Props{

    recruiter:React.ReactNode;

    conversation:React.ReactNode;

    status:React.ReactNode;

    controls:React.ReactNode;

    evaluation:React.ReactNode;

}

export default function InterviewRoom({

    recruiter,

    conversation,

    status,

    controls,

    evaluation

}:Props){

    return(

        <div className="live-room">

            <div className="live-header">

                <h2>

                    InterviewPilot Live

                </h2>

                <span>

                    ● LIVE

                </span>

            </div>

            {recruiter}

            {conversation}

            {status}

            {controls}

            {evaluation}

        </div>

    );

}