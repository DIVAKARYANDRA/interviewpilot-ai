import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import ScoreCard from "../../components/report/ScoreCard/ScoreCard";
import { useNavigate } from "react-router-dom";
import ListCard from "../../components/report/ListCard/ListCard";


import "./ReportPage.css";


export default function ReportPage(){


    const {

        report

    } = useInterview();

    const navigate = useNavigate();



    if(!report){

        return(

            <MainLayout>

                <h2>

                    Report not available

                </h2>

            </MainLayout>

        )

    }



    return(

        <MainLayout>


            <div className="report-container">


                <h1>

                    Interview Performance Report

                </h1>



                <div className="overall-score">

    <p>

        Interview Completed 🎉

    </p>

    <h2>

        Overall Performance

    </h2>

    <div className="overall-circle">

        {report.overall_score}

        <span>

            %

        </span>

    </div>

</div>




                <div className="score-grid">


                    <ScoreCard

                        title="Technical"

                        score={report.technical_score}

                    />


                    <ScoreCard

                        title="Communication"

                        score={report.communication_score}

                    />


                    <ScoreCard

                        title="Confidence"

                        score={report.confidence_score}

                    />


                </div>

                <div className="summary-card">

    <h2>

        🤖 AI Summary

    </h2>

    <p>

        {report.summary}

    </p>

</div>




                <ListCard

                    title="Strengths"

                    items={report.strengths}

                />



                <ListCard

                    title="Areas To Improve"

                    items={report.weaknesses}

                />



                <ListCard

                    title="Learning Roadmap"

                    items={report.learning_roadmap}

                />



                <div className="readiness">


                    <h2>

                        Company Readiness

                    </h2>


                    <p>

                        {report.company_readiness}

                    </p>


                </div>

                <button
                    onClick={() => navigate("/interview/setup")}
                >

                    Start New Interview

                </button>



            </div>


        </MainLayout>

    );

}