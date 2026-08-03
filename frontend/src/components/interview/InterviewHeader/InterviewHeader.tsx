import "./InterviewHeader.css";

interface Props{

    company:string;

    role:string;

}

export default function InterviewHeader({

    company,

    role

}:Props){

    return(

        <header className="meeting-header">

            <div>

                <h2>

                    InterviewPilot Live

                </h2>

                <small>

                    {company}

                    {" • "}

                    {role}

                </small>

            </div>

            <div className="meeting-live">

                ● LIVE

            </div>

        </header>

    );

}