import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";

import InterviewLayout from "../../components/interview/InterviewLayout/InterviewLayout";
import Progress from "../../components/interview/Progress/Progress";
import QuestionCard from "../../components/interview/QuestionCard/QuestionCard";
import AnswerBox from "../../components/interview/AnswerBox/AnswerBox";
import EvaluationPanel from "../../components/interview/EvaluationPanel/EvaluationPanel";

export default function InterviewPage() {

    const {

        sessionId,

        question,

        answer,

        setAnswer,

        setQuestion,

        evaluation,

        setEvaluation,

        currentQuestion,

        setCurrentQuestion

    } = useInterview();

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {

        if (!answer.trim()) {

            alert("Please enter your answer.");

            return;

        }

        setLoading(true);

        try {

            const response = await submitAnswer({

                session_id: sessionId,

                answer

            });

            setQuestion(response.question);

            setEvaluation(response.evaluation);

            setCurrentQuestion(currentQuestion + 1);

            setAnswer("");

        } catch (error) {

            console.error(error);

            alert("Failed to submit answer.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <MainLayout>

            <InterviewLayout>

                <Progress />

                <QuestionCard
                    question={question}
                />

                <AnswerBox
                    answer={answer}
                    setAnswer={setAnswer}
                />

                <br />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                >

                    {

                        loading

                            ?

                            "Submitting..."

                            :

                            "Submit Answer"

                    }

                </button>

                <br />

                <br />

                <EvaluationPanel
                    evaluation={evaluation}
                />

            </InterviewLayout>

        </MainLayout>

    );

}