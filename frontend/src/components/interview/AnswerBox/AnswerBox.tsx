import "./AnswerBox.css";

interface Props{

    answer:string;

    setAnswer:(value:string)=>void;

}

export default function AnswerBox({

    answer,

    setAnswer

}:Props){

    return(

        <textarea

            className="answer-box"

            rows={8}

            value={answer}

            onChange={(e)=>

                setAnswer(e.target.value)

            }

        />

    )

}