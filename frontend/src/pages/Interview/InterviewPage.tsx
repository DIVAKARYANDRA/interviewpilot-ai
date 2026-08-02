import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";
import { endInterview } from "../../services/reportService";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

import { speak } from "../../hooks/useSpeech";

import InterviewLayout from "../../components/interview/InterviewLayout/InterviewLayout";
import Progress from "../../components/interview/Progress/Progress";
import QuestionCard from "../../components/interview/QuestionCard/QuestionCard";
import InterviewInput from "../../components/interview/InterviewInput/InterviewInput";
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

    return (

        <MainLayout>

            <InterviewLayout>

                <Progress />

                <QuestionCard

                    question={question}

                />

                <InterviewInput

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