import Card from "../../common/Card/Card";
import "./QuestionCard.css";

interface Props {
    question: string;
}

export default function QuestionCard({
    question
}: Props) {

    return (

        <Card>

            <h3>💬 Interview Question</h3>

            <p className="question-text">

                {question}

            </p>

        </Card>

    );

}