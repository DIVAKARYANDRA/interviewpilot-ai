import MainLayout from "../../layouts/MainLayout";

import { useInterview } from "../../context/InterviewContext";

import ScoreCard from "../../components/report/ScoreCard/ScoreCard";
import { useNavigate } from "react-router-dom";
import ListCard from "../../components/report/ListCard/ListCard";
import { useEffect, useState } from "react";

import {
    PartyPopper,
    Sparkles,
    Target,
    TrendingUp,
    RotateCcw,
    History,
    Download
} from "lucide-react";

import "./ReportPage.css";


export default function ReportPage(){


    const {
        report
    } = useInterview();

    const navigate = useNavigate();

    const [animatedScore, setAnimatedScore] = useState(0);



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

                <div className="report-empty">

                    <h2>

                        Report not available

                    </h2>

                    <p>

                        Complete an interview to see your assessment here.

                    </p>

                </div>

            </MainLayout>

        )

    }

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

    const stars = Math.round((report?.overall_score ?? 0) / 20);

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

// Purely presentational — same score value, just used to derive a ring color.
const scoreTone =
    report.overall_score >= 80
        ? "high"
        : report.overall_score >= 50
        ? "mid"
        : "low";

const RING_RADIUS = 90;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const ringOffset =
    RING_CIRCUMFERENCE - (animatedScore / 100) * RING_CIRCUMFERENCE;



    return(

        <MainLayout>

            <div className="report-container">

                {/* HERO */}
                <section className="report-hero">

                    <span className="hero-badge">
                        <PartyPopper size={14} />
                        Interview Completed
                    </span>

                    <h1>
                        AI Interview Assessment
                    </h1>

                    <p className="hero-subtitle">
                        Here's a complete analysis of your interview performance.
                    </p>

                </section>

                {/* OVERALL SCORE */}
                <section className={`overall-score tone-${scoreTone}`}>

                    <div className="overall-score-ring">

                        <svg viewBox="0 0 200 200">

                            <circle
                                className="overall-ring-track"
                                cx="100" cy="100" r={RING_RADIUS}
                            />

                            <circle
                                className="overall-ring-fill"
                                cx="100" cy="100" r={RING_RADIUS}
                                style={{
                                    strokeDasharray: RING_CIRCUMFERENCE,
                                    strokeDashoffset: ringOffset
                                }}
                            />

                        </svg>

                        <div className="overall-ring-center">

                            <span className="overall-ring-value">
                                {animatedScore}
                            </span>
                            <span className="overall-ring-percent">%</span>

                        </div>

                    </div>

                    <div className="overall-score-meta">

                        <h3 className="performance-label">
                            {performanceLabel}
                        </h3>

                        <div className="overall-rating" aria-label={`${stars} out of 5 stars`}>
                            {starText}
                        </div>

                        <p className="percentile">
                            Top {percentile}% Performance
                        </p>

                    </div>

                </section>

                {/* SKILL BREAKDOWN */}
                <section className="report-section">

                    <h2 className="section-title">Skill Breakdown</h2>

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

                </section>

                {/* AI SUMMARY + RECOMMENDATION */}
                <section className="report-section">

                    <div className="summary-recommendation-grid">

                        <div className="summary-card">

                            <div className="card-eyebrow">
                                <Sparkles size={14} />
                                AI Interview Assessment
                            </div>

                            <p>
                                {report.summary}
                            </p>

                        </div>

                        <div className={`recommendation-card tone-${scoreTone}`}>

                            <div className="card-eyebrow">
                                <Target size={14} />
                                AI Hiring Recommendation
                            </div>

                            <h3>
                                {recommendation}
                            </h3>

                            <p>
                                Based on your technical knowledge,
                                communication skills and confidence
                                demonstrated during this interview.
                            </p>

                        </div>

                    </div>

                </section>

                {/* STRENGTHS / WEAKNESSES */}
                <section className="report-section">

                    <div className="list-grid">

                        <ListCard
                            title="Strengths"
                            items={report.strengths}
                            variant="positive"
                            highlight={
                                report.strengths[0]
                                    ? `Strongest area: ${report.strengths[0]}`
                                    : undefined
                            }
                        />

                        <ListCard
                            title="Areas To Improve"
                            items={report.weaknesses}
                            variant="negative"
                            highlight={
                                report.weaknesses[0]
                                    ? `Highest priority: ${report.weaknesses[0]}`
                                    : undefined
                            }
                        />

                    </div>

                </section>

                {/* LEARNING ROADMAP */}
                <section className="report-section">

                    <ListCard
                        title="Learning Roadmap"
                        items={report.learning_roadmap}
                        variant="roadmap"
                    />

                </section>

                {/* READINESS + NEXT GOAL */}
                <section className="report-section">

                    <div className="readiness-goal-grid">

                        <div className="readiness-card">

                            <div className="card-eyebrow">
                                <Target size={14} />
                                Company Readiness
                            </div>

                            <p>{report.company_readiness}</p>

                            <div className="readiness-bar">
                                <div
                                    className="readiness-fill"
                                    style={{ width:`${report.overall_score}%` }}
                                />
                            </div>

                            <span className="readiness-score">
                                {report.overall_score}% Ready
                            </span>

                        </div>

                        <div className="goal-card">

                            <div className="card-eyebrow">
                                <TrendingUp size={14} />
                                Next Goal
                            </div>

                            <h3>Reach 90+ Overall Score</h3>

                            <p>
                                Improve by {Math.max(0, 90 - report.overall_score)} more points.
                            </p>

                        </div>

                    </div>

                </section>

                {/* ACTIONS */}
                <section className="report-actions">

                    <button
                        onClick={() => navigate("/interview/setup")}
                    >
                        <RotateCcw size={16} />
                        Start New Interview
                    </button>

                    <button
                        className="history-btn"
                        onClick={() => navigate("/history")}
                    >
                        <History size={16} />
                        View Interview History
                    </button>

                    <button
                        className="ghost-btn"
                        onClick={() => window.print()}
                    >
                        <Download size={16} />
                        Download Report
                    </button>

                </section>

                <footer className="report-footer">
                    Generated by <strong>InterviewPilot AI</strong>
                    <br/>
                    Helping engineers crack top product companies.
                </footer>

            </div>

        </MainLayout>

    );

}
