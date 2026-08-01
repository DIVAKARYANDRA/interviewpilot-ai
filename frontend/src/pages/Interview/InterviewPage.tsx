import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import { submitAnswer } from "../../services/interviewService";

export default function InterviewPage() {

    const {

        sessionId,

        question,

        setQuestion,

        evaluation,

        setEvaluation

    } = useInterview();

    const [answer,setAnswer]=useState("");

    const [loading,setLoading]=useState(false);

    async function handleSubmit(){

        setLoading(true);

        const response=await submitAnswer({

            session_id:sessionId,

            answer

        });

        setQuestion(response.question);

        setEvaluation(response.evaluation);

        setAnswer("");

        setLoading(false);

    }

    return(

        <MainLayout>

            <h1>

                AI Interview

            </h1>

            <br/>

            <h2>

                {question}

            </h2>

            <br/>

            <textarea

                rows={8}

                value={answer}

                onChange={(e)=>setAnswer(e.target.value)}

            />

            <br/>

            <button

                onClick={handleSubmit}

            >

                {

                    loading

                    ?

                    "Submitting..."

                    :

                    "Submit Answer"

                }

            </button>

            {

                evaluation &&

                <>

                    <hr/>

                    <h2>

                        AI Evaluation

                    </h2>

                    <p>

                        Technical :

                        {evaluation.technical_score}

                    </p>

                    <p>

                        Communication :

                        {evaluation.communication_score}

                    </p>

                    <p>

                        Confidence :

                        {evaluation.confidence_score}

                    </p>

                    <p>

                        Feedback :

                        {evaluation.feedback}

                    </p>

                </>

            }

        </MainLayout>

    );

}