import { useInterview } from "../../../context/InterviewContext";

export default function Progress() {

    const {

        currentQuestion,

        totalQuestions

    } = useInterview();

    return(

        <p>

            Question {currentQuestion} of {totalQuestions}

        </p>

    )

}