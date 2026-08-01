interface Props{

    evaluation:any;

}

export default function EvaluationPanel({

    evaluation

}:Props){

    if(!evaluation){

        return null;

    }

    return(

        <div>

            <h2>

                AI Evaluation

            </h2>

            <p>

                Technical :

                {evaluation.technical_score}

            </p>

            <p>

                Communication :

                {evaluation.communication_score}

            </p>

            <p>

                Confidence :

                {evaluation.confidence_score}

            </p>

            <p>

                {evaluation.feedback}

            </p>

        </div>

    )

}