import { motion } from "framer-motion";
import { Sparkles, BookOpen, Mic, Target } from "lucide-react";
import "./AIRecommendations.css";

interface Props {
    averageScore: number;
    totalInterviews: number;
    loading?: boolean;
}

// Purely presentational: derives a short set of suggestions from the
// dashboard stats already returned by /dashboard — no new backend calls.
function buildRecommendations(averageScore: number, totalInterviews: number) {

    if (totalInterviews === 0) {
        return [
            {
                icon: Target,
                title: "Take your first interview",
                text: "Start with a text interview to establish your baseline score.",
            },
            {
                icon: Mic,
                title: "Try Voice Interview",
                text: "Practice explaining answers out loud — it's closer to the real thing.",
            },
        ];
    }

    if (averageScore < 60) {
        return [
            {
                icon: BookOpen,
                title: "Revisit the fundamentals",
                text: "Your average score suggests core concepts need reinforcement before tackling harder rounds.",
            },
            {
                icon: Target,
                title: "Repeat easier interviews",
                text: "Build confidence with lower-difficulty sessions before increasing complexity.",
            },
        ];
    }

    if (averageScore < 85) {
        return [
            {
                icon: Mic,
                title: "Practice with Voice Interview",
                text: "Verbal explanation under time pressure is usually the biggest gap at this stage.",
            },
            {
                icon: Target,
                title: "Raise the difficulty",
                text: "Try a harder company/role combination to keep pushing your score up.",
            },
        ];
    }

    return [
        {
            icon: Sparkles,
            title: "You're interview ready",
            text: "Keep sessions consistent and focus on polishing communication and confidence.",
        },
        {
            icon: Target,
            title: "Simulate the real thing",
            text: "Try a Voice Interview for your target company to rehearse under realistic conditions.",
        },
    ];
}

export default function AIRecommendations({ averageScore, totalInterviews, loading }: Props) {

    const tips = buildRecommendations(averageScore, totalInterviews);

    return (
        <motion.section
            className="ai-recs-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >

            <div className="ai-recs-head">
                <Sparkles size={16} />
                <h3>AI Recommendations</h3>
            </div>

            {
                loading
                ?
                <div className="ai-recs-skeleton">
                    <div className="skeleton" />
                    <div className="skeleton" />
                </div>
                :
                <div className="ai-recs-list">
                    {tips.map((tip) => (
                        <div className="ai-rec-item" key={tip.title}>
                            <div className="ai-rec-icon">
                                <tip.icon size={16} />
                            </div>
                            <div>
                                <span className="ai-rec-title">{tip.title}</span>
                                <p>{tip.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }

        </motion.section>
    );
}
