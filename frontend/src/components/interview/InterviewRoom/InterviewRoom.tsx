import "./InterviewRoom.css";

interface Props{

    header:React.ReactNode;

    recruiter:React.ReactNode;

    transcript:React.ReactNode;

    status:React.ReactNode;

    controls:React.ReactNode;

    evaluation:React.ReactNode;

}

export default function InterviewRoom({

    header,

    recruiter,

    transcript,

    status,

    controls,

    evaluation

}:Props){

    return(

        <div className="meeting-room">

            {header}

            {recruiter}

            {transcript}

            {status}

            {controls}

            {evaluation}

        </div>

    );

}