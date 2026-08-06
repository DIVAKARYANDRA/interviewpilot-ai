import MainLayout from "../../../layouts/MainLayout";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInterview } from "../../../context/InterviewContext";

import { submitAnswer } from "../../../services/interviewService";
import { endInterview } from "../../../services/reportService";

import ConnectingScreen from "../ConnectingScreen/ConnectingScreen";
import InterviewLive from "../InterviewLive/InterviewLive";

import useVoiceInterview from "../../../hooks/useVoiceInterview";
import useInterviewStage from "../../../hooks/useInterviewStage";

import "./VoiceInterview.css";

export default function VoiceInterview() {

    const {

        sessionId,

        answer,

        setAnswer,

        setQuestion,

        setEvaluation,

        setCurrentQuestion,

        setReport,

        setRecruiterState,

        stage

    } = useInterview();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useInterviewStage();

    async function handleEndInterview() {

        if (loading) return;

        const confirmed = window.confirm(
            "End this interview now? Your progress so far will be evaluated and a report will be generated."
        );

        if (!confirmed) return;

        setLoading(true);

        try {

            const report = await endInterview(sessionId);
            setReport(report);
            navigate("/report");

        }
        catch (e) {

            console.error(e);
            alert("Failed to end interview.");

        }
        finally {

            setLoading(false);

        }

    }

    async function handleSubmit(answerText?: string) {

    if (loading) return;

    const finalAnswer = answerText ?? answer;

    // If candidate didn't answer anything,
    // send a placeholder instead of returning.
    const answerToSubmit =
        finalAnswer.trim()
            ? finalAnswer
            : "Candidate skipped this question.";

    setLoading(true);

    setRecruiterState("thinking");

    try {

        const response = await submitAnswer({

            session_id: sessionId,

            answer: answerToSubmit

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

        setRecruiterState("speaking");

    }
    catch (e) {

        console.error(e);

        alert("Failed to submit answer.");

    }
    finally {

        setLoading(false);

    }

}

    const { muted, toggleMute } = useVoiceInterview(handleSubmit);

    if(stage==="connecting"){

        return(

            <MainLayout>

                <ConnectingScreen/>

            </MainLayout>

        );

    }

    return(

        <MainLayout>

            <InterviewLive

                muted={muted}

                onToggleMute={toggleMute}

                onEndInterview={handleEndInterview}

            />

        </MainLayout>

    );

}