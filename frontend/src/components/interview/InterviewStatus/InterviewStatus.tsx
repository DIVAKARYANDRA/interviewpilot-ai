import "./InterviewStatus.css";

interface Props{

    current:number;

    total:number;

    listening:boolean;

}

export default function InterviewStatus({

    current,

    total,

    listening

}:Props){

    return(

        <div className="interview-status">

            <div>

                Question

                <strong>

                    {current}/{total}

                </strong>

            </div>

            <div>

                {

                    listening

                    ?

                    "🎤 Listening"

                    :

                    "🤖 AI Speaking"

                }

            </div>

            <div className="live">

                ● LIVE

            </div>

        </div>

    );

}