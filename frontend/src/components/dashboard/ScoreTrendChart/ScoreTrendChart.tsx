import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { LineChart as LineChartIcon } from "lucide-react";
import type { RecentInterview } from "../../../types/dashboard";
import "./ScoreTrendChart.css";

interface Props {
    interviews: RecentInterview[];
    loading?: boolean;
}

interface TooltipPayloadItem {
    value: number;
    payload: { company: string; role: string };
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
    if (!active || !payload || !payload.length) return null;
    const point = payload[0];
    return (
        <div className="trend-tooltip">
            <strong>{point.payload.company}</strong>
            <span>{point.payload.role}</span>
            <span className="trend-tooltip-score">{point.value}%</span>
        </div>
    );
}

export default function ScoreTrendChart({ interviews, loading }: Props) {

    // Backend returns newest-first; reverse for a left-to-right chronological trend.
    const data = [...interviews].reverse().map((i, idx) => ({
        label: `#${idx + 1}`,
        company: i.company,
        role: i.role,
        score: i.overall_score,
    }));

    return (
        <motion.section
            className="score-trend-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >

            <div className="score-trend-head">
                <div className="score-trend-title">
                    <LineChartIcon size={16} />
                    <h3>Score Trend</h3>
                </div>
                <span className="score-trend-sub">Last {data.length || 0} interviews</span>
            </div>

            {
                loading
                ?
                <div className="score-trend-skeleton skeleton" />
                :
                data.length < 2
                ?
                <div className="score-trend-empty">
                    <p>Complete a couple more interviews to see your trend line.</p>
                </div>
                :
                <div className="score-trend-chart">
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="scoreTrendFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.45} />
                                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                            <XAxis dataKey="label" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis domain={[0, 100]} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} width={36} />
                            <Tooltip content={<ChartTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#818CF8"
                                strokeWidth={2.5}
                                fill="url(#scoreTrendFill)"
                                animationDuration={900}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            }

        </motion.section>
    );
}
