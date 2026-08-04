import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout";

import { useInterview } from "../../../context/InterviewContext";

import { submitAnswer } from "../../../services/interviewService";
import { endInterview } from "../../../services/reportService";

import Progress from "../Progress/Progress";
import QuestionCard from "../QuestionCard/QuestionCard";
import InterviewInput from "../InterviewInput/InterviewInput";
import InterviewControls from "../InterviewControls/InterviewControls";
import EvaluationPanel from "../EvaluationPanel/EvaluationPanel";

import "./TextInterview.css";

export default function TextInterview() {

    const {

        sessionId,

        question,

        answer,

        setAnswer,

        setQuestion,

        evaluation,

        setEvaluation,

        currentQuestion,

        setCurrentQuestion,

        setReport

    } = useInterview();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {

        if (loading) return;

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

            setEvaluation(response.evaluation);

            if (response.interview_completed) {

                const report = await endInterview(sessionId);

                setReport(report);

                navigate("/report");

                return;

            }

            setQuestion(response.question);

            setCurrentQuestion(response.question_number);

            setAnswer("");

        }

        catch (e) {

            console.error(e);

            alert("Failed to submit answer.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <MainLayout>

            <div className="text-interview">

                <Progress />

                <QuestionCard

                    question={question}

                />

                <InterviewInput

                    answer={answer}

                    setAnswer={setAnswer}

                />

                <InterviewControls

                    loading={loading}

                    onSubmit={handleSubmit}

                    voiceMode={false}

                />

                <EvaluationPanel

                    evaluation={evaluation}

                />

            </div>

        </MainLayout>

    );

}