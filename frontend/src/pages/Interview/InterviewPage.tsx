import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";
import { endInterview } from "../../services/reportService";

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

        setCurrentQuestion,

        setReport

    } = useInterview();



    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);



    async function handleSubmit() {


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



            setAnswer("");



            /*
             Interview Completed
            */

            if (response.interview_completed) {


                try {


                    const report = await endInterview(
                        sessionId
                    );


                    setReport(report);


                    navigate("/report");


                }

                catch(error){


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


            setEvaluation(
                response.evaluation
            );


            setQuestion(
                response.question
            );


            setCurrentQuestion(
                response.question_number
            );


        }


        catch(error){


            console.error(
                error
            );


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