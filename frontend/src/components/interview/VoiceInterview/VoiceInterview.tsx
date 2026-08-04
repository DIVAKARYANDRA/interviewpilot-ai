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
// import { useState } from "react";
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

        // interviewMode,

        stage,

        recruiterState

    } = useInterview();

    useVoiceInterview(

()=>{}

);


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

                        loading={false}

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