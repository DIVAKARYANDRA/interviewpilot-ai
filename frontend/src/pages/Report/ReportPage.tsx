import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import ScoreCard from "../../components/report/ScoreCard/ScoreCard";
import { useNavigate } from "react-router-dom";
import ListCard from "../../components/report/ListCard/ListCard";
import { useEffect, useState } from "react";

import "./ReportPage.css";


export default function ReportPage(){


    const {

        report

    } = useInterview();

    const navigate = useNavigate();

    const [animatedScore, setAnimatedScore] = useState(0);

    const performanceLabel =
    report?.overall_score >= 90
        ? "Outstanding"
        : report?.overall_score >= 80
        ? "Excellent"
        : report?.overall_score >= 70
        ? "Good"
        : report?.overall_score >= 60
        ? "Needs Improvement"
        : "Keep Practicing";

    const stars = Math.max(
    1,
    Math.round(report.overall_score / 20)
);

const starText =

"★★★★★".slice(0, stars) +

"☆☆☆☆☆".slice(0, 5 - stars);

const recommendation =
    report?.overall_score >= 85
        ? "Recommended"
        : report?.overall_score >= 70
        ? "Recommended after Preparation"
        : "Needs More Practice";

const percentile = Math.max(
    5,
    100 - (report?.overall_score ?? 0)
);

useEffect(() => {

    if (!report) return;

    let current = 0;

    const timer = setInterval(() => {

        current++;

        setAnimatedScore(current);

        if (current >= report.overall_score) {

            clearInterval(timer);

        }

    }, 15);

    return () => clearInterval(timer);

}, [report]);



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


                <div className="report-hero">

    <p className="hero-badge">

        🎉 Interview Completed

    </p>

    <h1>

        AI Interview Assessment

    </h1>

    <p className="hero-subtitle">

        Here's a complete analysis of your interview performance.

    </p>

</div>



                <div className="overall-score">

    <h2>

        Overall Score

    </h2>

    <div className="overall-rating">

    <h2>

        {starText}

    </h2>

</div>

    <div className="overall-circle">

        {animatedScore}

        <span>

            %

        </span>

    </div>

    <h3 className="performance-label">

        {performanceLabel}

    </h3>

    

    <p className="percentile">

        Top {percentile}% Performance

    </p>

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

                <div className="recommendation-card">

    <h2>

        🤖 AI Hiring Recommendation

    </h2>

    <h3>

        {recommendation}

    </h3>

    <p>

        Based on your technical knowledge,
        communication skills and confidence
        demonstrated during this interview.

    </p>

</div>

                <div className="summary-card">

    <h2>

        🤖 AI Interview Assessment

    </h2>

    <p>

        {report.summary}

    </p>

</div>

<div className="highlight-card">

    <h2>

        🏆 Strongest Area

    </h2>

    <h3>

        {report.strengths[0]}

    </h3>

</div>




                <ListCard

                    title="Strengths"

                    items={report.strengths}

                />

                <div className="highlight-card">

    <h2>

        🎯 Highest Priority

    </h2>

    <h3>

        {report.weaknesses[0]}

    </h3>

</div>



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

        🎯 Company Readiness

    </h2>

    <p>

        {report.company_readiness}

    </p>

    <div className="readiness-bar">

    <div

        className="readiness-fill"

        style={{

            width:`${report.overall_score}%`

        }}

    />

</div>

<p className="readiness-score">

    {report.overall_score}% Ready

</p>

</div>

<div className="goal-card">

    <h2>

        🚀 Next Goal

    </h2>

    <h3>

        Reach 90+ Overall Score

    </h3>

    <p>

        Improve by

        {Math.max(0,90-report.overall_score)}

        more points.

    </p>

</div>

               <div className="report-actions">

    <button
        onClick={() =>
            navigate("/interview/setup")
        }
    >

        🚀 Start New Interview

    </button>

    <button
        className="history-btn"
        onClick={() =>
            navigate("/history")
        }
    >

        📊 View Interview History

    </button>

</div>



            </div>


        </MainLayout>

    );

}