import "./LiveTranscript.css";

interface Props{

    question:string;

    answer:string;

}

export default function LiveTranscript({

    question,

    answer

}:Props){

    return(

        <div className="live-transcript">

            <div className="question-card">

                <div className="card-title">

                    💬 Current Question

                </div>

                <div className="card-content">

                    {question}

                </div>

            </div>

            <div className="answer-card">

                <div className="card-title">

                    🎤 Live Transcript

                </div>

                <div className="card-content">

                    {

                        answer ||

                        "Listening for your response..."

                    }

                </div>

            </div>

        </div>

    );

}