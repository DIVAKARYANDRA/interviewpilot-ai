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

            <div className="meeting-body">

                <aside className="meeting-left">

                    {recruiter}
                </aside>

                <section className="meeting-right">

                    {transcript}

                </section>

            </div>

            <div className="meeting-footer">

    {status}

    {controls}

</div>

        </div>

    );

}