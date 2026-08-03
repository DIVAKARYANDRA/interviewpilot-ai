import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";
import { endInterview } from "../../services/reportService";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import useInterviewStage
from "../../hooks/useInterviewStage";
import { speak } from "../../hooks/useSpeech";
import "./InterviewPage.css";
// import InterviewLayout from "../../components/interview/InterviewLayout/InterviewLayout";
// import QuestionCard from "../../components/interview/QuestionCard/QuestionCard";
import InterviewInput from "../../components/interview/InterviewInput/InterviewInput";
import EvaluationPanel from "../../components/interview/EvaluationPanel/EvaluationPanel";
import InterviewHeader from "../../components/interview/InterviewHeader/InterviewHeader";
import InterviewRoom
from "../../components/interview/InterviewRoom/InterviewRoom";
import { greetingMessage }

from "../../constants/interviewGreeting";
import InterviewStage
from "../../components/interview/InterviewStage/InterviewStage";

import ConnectingScreen
from "../../components/interview/ConnectingScreen/ConnectingScreen";

import Conversation
from "../../components/interview/Conversation/Conversation";

import InterviewStatus
from "../../components/interview/InterviewStatus/InterviewStatus";

import InterviewControls
from "../../components/interview/InterviewControls/InterviewControls";


export default function InterviewPage() {

    const {

        sessionId,

        question,

        answer,

        setAnswer,

        setQuestion,

        evaluation,

        setEvaluation,

        setCurrentQuestion,

        setReport,

        currentQuestion,

        totalQuestions,

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


            startListening,


        } = useSpeechRecognition(

            async (text) => {

                setAnswer(text);

            }

        );

    /*
     --------------------------------
     Voice Mode
     --------------------------------
    */

     useEffect(() => {

        if (transcript) {

            setAnswer(transcript);

        }

    }, [transcript]);
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

            } else {

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

           

        }

        return () => {

            window.speechSynthesis.cancel();

        };

    }, [

        question,

        interviewMode

    ]);

    useEffect(() => {

    if (

        interviewMode !== "voice"

    ) {

        return;

    }

    if (

        answer.trim()

    ) {

        handleSubmit();

    }

}, [

    answer

]);


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

            alert(

                "Please enter your answer."

            );

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
             Save evaluation first
            */

            setEvaluation(

                response.evaluation

            );

            /*
             Interview Finished
            */

            if (

                response.interview_completed

            ) {

                try {

                    const report = await endInterview(

                        sessionId

                    );

                    setReport(

                        report

                    );

                    navigate(

                        "/report"

                    );

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
             Continue Interview
            */

            setQuestion(

                response.question

            );

            setRecruiterState("speaking");

            setCurrentQuestion(

                response.question_number

            );

            setAnswer("");

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
if (stage === "connecting") {

    return (

        <MainLayout>

            <ConnectingScreen />

        </MainLayout>

    );

}

const recruiterMessage =

    stage === "greeting"

        ? greetingMessage

        : question;

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

                        interviewMode === "voice"

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

interviewMode==="voice"

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