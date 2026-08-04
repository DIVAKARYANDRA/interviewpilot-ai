import MainLayout from "../../../layouts/MainLayout";

import { useInterview } from "../../../context/InterviewContext";

import InterviewRoom from "../InterviewRoom/InterviewRoom";
import InterviewHeader from "../InterviewHeader/InterviewHeader";
import InterviewStage from "../InterviewStage/InterviewStage";
import Conversation from "../Conversation/Conversation";
import InterviewStatus from "../InterviewStatus/InterviewStatus";
import InterviewControls from "../InterviewControls/InterviewControls";
import EvaluationPanel from "../EvaluationPanel/EvaluationPanel";
import ConnectingScreen from "../ConnectingScreen/ConnectingScreen";
import useVoiceInterview
import { useState } from "react";
from "../../../hooks/useVoiceInterview";
import { greetingMessage } from "../../../constants/interviewGreeting";

import "./VoiceInterview.css";

export default function VoiceInterview() {

    const {

        question,

        answer,

        evaluation,

        currentQuestion,

        totalQuestions,

        interviewMode,

        stage,

        recruiterState

    } = useInterview();

    const [loading,setLoading]=useState(false);

    useVoiceInterview(

handleSubmit

);

 
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


    if(stage==="connecting"){

        return(

            <MainLayout>

                <ConnectingScreen/>

            </MainLayout>

        );

    }

    const recruiterMessage =

        stage==="greeting"

            ?

            greetingMessage

            :

            question;

    return(

        <MainLayout>

            <InterviewRoom

                header={

                    <InterviewHeader

                        company="InterviewPilot"

                        role="AI Mock Interview"

                    />

                }

                recruiter={

                    <InterviewStage

                        recruiterName="Divakar AI"

                        recruiterTitle="Senior Technical Interviewer"

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

                            recruiterState==="listening"

                        }

                    />

                }

                controls={

                    <InterviewControls

                        loading={loading}

                        onSubmit={()=>{}}

                        voiceMode={true}

                    />

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