import Card from "../../common/Card/Card";
import TextArea from "../../common/TextArea/TextArea";

interface Props{

    answer:string;

    setAnswer:(value:string)=>void;

}

export default function AnswerCard({

    answer,

    setAnswer

}:Props){

    return(

        <Card>

            <h3>

                ✍️ Your Answer

            </h3>

            <TextArea

                rows={8}

                value={answer}

                placeholder="Write your answer here..."

                onChange={setAnswer}

            />

        </Card>

    );

}