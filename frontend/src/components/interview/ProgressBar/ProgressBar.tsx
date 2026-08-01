import "./ProgressBar.css";

interface Props{

    current:number;

    total:number;

}

export default function ProgressBar({

    current,

    total

}:Props){

    const percentage=(current/total)*100;

    return(

        <div>

            <p>

                Question {current} of {total}

            </p>

            <div className="progress-track">

                <div

                    className="progress-fill"

                    style={{

                        width:`${percentage}%`

                    }}

                />

            </div>

        </div>

    )

}