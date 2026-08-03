import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";
import { endInterview } from "../../services/reportService";

import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import useInterviewStage from "../../hooks/useInterviewStage";
import { speak } from "../../hooks/useSpeech";

import "./InterviewPage.css";

import InterviewRoom from "../../components/interview/InterviewRoom/InterviewRoom";
import InterviewHeader from "../../components/interview/InterviewHeader/InterviewHeader";
import InterviewStage from "../../components/interview/InterviewStage/InterviewStage";
import Conversation from "../../components/interview/Conversation/Conversation";
import InterviewStatus from "../../components/interview/InterviewStatus/InterviewStatus";
import InterviewControls from "../../components/interview/InterviewControls/InterviewControls";
import InterviewInput from "../../components/interview/InterviewInput/InterviewInput";
import EvaluationPanel from "../../components/interview/EvaluationPanel/EvaluationPanel";
import ConnectingScreen from "../../components/interview/ConnectingScreen/ConnectingScreen";

import { greetingMessage } from "../../constants/interviewGreeting";

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

        totalQuestions,

        setCurrentQuestion,

        setReport,

        interviewMode,

        stage

    } = useInterview();

    useInterviewStage();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [recruiterState, setRecruiterState] = useState<
        "idle" | "speaking" | "listening" | "thinking"
    >("idle");

    const {

        transcript,

        startListening

    } = useSpeechRecognition(

        async (text) => {

            setAnswer(text);

        }

    );

    /*
    ------------------------------------
    Live Transcript
    ------------------------------------
    */

    useEffect(() => {

        if (transcript) {

            setAnswer(transcript);

        }

    }, [transcript]);

    /*
    ------------------------------------
    AI Speech
    ------------------------------------
    */

    useEffect(() => {

        if (interviewMode !== "voice") {

            return;

        }

        const textToSpeak =

            stage === "greeting"

                ? greetingMessage

                : question;

        if (!textToSpeak) {

            return;

        }

        setRecruiterState("speaking");

        window.speechSynthesis.cancel();

        speak(

            textToSpeak,

            () => {

                if (stage === "interview") {

                    setRecruiterState("listening");

                    startListening();

                }

                else {

                    setRecruiterState("idle");

                }

            }

        );

        return () => {

            window.speechSynthesis.cancel();

        };

    }, [

        question,

        interviewMode,

        stage,

        startListening

    ]);

    /*
    ------------------------------------
    Voice Auto Submit
    ------------------------------------
    */

    useEffect(() => {

        if (interviewMode !== "voice") {

            return;

        }

        if (answer.trim()) {

            handleSubmit();

        }

    }, [

        answer

    ]);

    /*
    ------------------------------------
    Submit Answer
    ------------------------------------
    */

    async function handleSubmit() {

        if (loading) {

            return;

        }

        if (!sessionId) {

            alert(

                "Interview session expired. Please start again."

            );

            navigate("/interview/setup");

            return;

        }

        if (!answer.trim()) {

            return;

        }

        setLoading(true);

        setRecruiterState("thinking");

        try {

            const response = await submitAnswer({

                session_id: sessionId,

                answer

            });

            /*
            ------------------------------------
            Save Evaluation
            ------------------------------------
            */

            setEvaluation(

                response.evaluation

            );

            /*
            ------------------------------------
            Interview Completed
            ------------------------------------
            */

            if (

                response.interview_completed

            ) {

                setRecruiterState("thinking");

                try {

                    const report = await endInterview(

                        sessionId

                    );

                    setReport(report);

                    navigate("/report");

                }

                catch (error) {

                    console.error(

                        "Report generation failed",

                        error

                    );

                    alert(

                        "Interview completed but report generation failed."

                    );

                }

                return;

            }

            /*
            ------------------------------------
            Next Question
            ------------------------------------
            */

            setCurrentQuestion(

                response.question_number

            );

            setQuestion(

                response.question

            );

            setAnswer("");

            /*
            Recruiter state will automatically
            change to SPEAKING inside useEffect()
            when question changes.
            */

        }

        catch (error) {

            console.error(error);

            alert(

                "Failed to submit answer."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*
    ------------------------------------
    Connecting Screen
    ------------------------------------
    */

    if (

        stage === "connecting"

    ) {

        return (

            <MainLayout>

                <ConnectingScreen />

            </MainLayout>

        );

    }

    /*
    ------------------------------------
    Greeting / Question
    ------------------------------------
    */

    const recruiterMessage =

        stage === "greeting"

            ? greetingMessage

            : question;


    /*
    ------------------------------------
    Interview Room
    ------------------------------------
    */

    return (

        <MainLayout>

            <InterviewRoom

                header={

                    <InterviewHeader

                        company="Amazon"

                        role="Backend Engineer"

                    />

                }

                recruiter={

                    <InterviewStage

                        recruiterName="Divakar AI"

                        recruiterTitle="AI Technical Interviewer"

                        company="InterviewPilot Live"

                        state={recruiterState}

                        message={recruiterMessage}

                    />

                }

                transcript={

                    <Conversation

                        question={recruiterMessage}

                        answer={answer}

                    />

                }

                status={

                    <InterviewStatus

                        current={currentQuestion}

                        total={totalQuestions}

                        listening={

                            recruiterState === "listening"

                        }

                    />

                }

                controls={

                    <>

                        {

                            interviewMode === "text"

                            &&

                            <InterviewInput

                                answer={answer}

                                setAnswer={setAnswer}

                            />

                        }

                        <InterviewControls

                            loading={loading}

                            onSubmit={handleSubmit}

                            voiceMode={

                                interviewMode === "voice"

                            }

                        />

                    </>

                }

                evaluation={

                    <EvaluationPanel

                        evaluation={evaluation}

                    />

                }

            />

        </MainLayout>

    );

}