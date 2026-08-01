import "./ScoreCard.css";

interface Props {

    title:string;

    score:number;

}

export default function ScoreCard({

    title,

    score

}:Props){

    return(

        <div className="score-card">

            <h3>

                {title}

            </h3>

            <h1>

                {score}

            </h1>

        </div>

    );

}