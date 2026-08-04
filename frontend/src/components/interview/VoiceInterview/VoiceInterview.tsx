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
import useVoiceInterview from "../../../hooks/useVoiceInterview";
import useInterviewStage from "../../../hooks/useInterviewStage";
import { greetingMessage } from "../../../constants/interviewGreeting";
import InterviewLive
from "../InterviewLive/InterviewLive";
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

    useInterviewStage();

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

        <InterviewLive

loading={loading}

onSubmit={handleSubmit}

/>

        </MainLayout>

    );

}