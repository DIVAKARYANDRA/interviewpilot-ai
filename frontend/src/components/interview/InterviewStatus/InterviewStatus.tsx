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

    const percentage=(current/total)*100;

    return(

        <section className="interview-status">

            <div className="progress-top">

                <span>

                    Question Progress

                </span>

                <strong>

                    {current}/{total}

                </strong>

            </div>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width:`${percentage}%`

                    }}

                />

            </div>

            <div className="status-bottom">

                <div className="voice-status">

                    {

                        listening

                        ?

                        "🎤 Listening..."

                        :

                        "🤖 AI Speaking..."

                    }

                </div>

                <div className="live-chip">

                    ● LIVE

                </div>

            </div>

        </section>

    );

}