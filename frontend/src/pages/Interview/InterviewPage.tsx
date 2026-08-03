import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";
import { endInterview } from "../../services/reportService";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

import { speak } from "../../hooks/useSpeech";
import "./InterviewPage.css";
// import InterviewLayout from "../../components/interview/InterviewLayout/InterviewLayout";
// import QuestionCard from "../../components/interview/QuestionCard/QuestionCard";
import InterviewInput from "../../components/interview/InterviewInput/InterviewInput";
import EvaluationPanel from "../../components/interview/EvaluationPanel/EvaluationPanel";
import InterviewHeader from "../../components/interview/InterviewHeader/InterviewHeader";
import InterviewRoom
from "../../components/interview/InterviewRoom/InterviewRoom";

import RecruiterCard
from "../../components/interview/RecruiterCard/RecruiterCard";

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

        interviewMode

    } = useInterview();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

        if (

            interviewMode === "voice"

            &&

            question

        ) {

            window.speechSynthesis.cancel();

            speak(

                question,

                () => {

                    startListening();

                }

            );

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

    return(

<MainLayout>

<InterviewRoom>

<RecruiterCard

state={

interviewMode==="voice"

?

(

loading

?

"speaking"

:

"listening"

)

:

"idle"

}

company="Amazon Backend Interview"

question={question}

/>

<Conversation

question={question}

answer={answer}

/>

<InterviewStatus

current={currentQuestion}

total={totalQuestions}

listening={

interviewMode==="voice"

}

/>

{

interviewMode==="text"

&&

<InterviewInput

answer={answer}

setAnswer={setAnswer}

/>

}

<InterviewControls

loading={loading}

onSubmit={handleSubmit}

/>

<EvaluationPanel

evaluation={evaluation}

/>

</InterviewRoom>

</MainLayout>

);

}