import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ListChecks, TrendingUp, Trophy, Gauge } from "lucide-react";
import "./StatsCard.css";

interface Props {

    title: string;

    value: string;

}

const ICONS: Record<string, typeof ListChecks> = {
    "Interviews": ListChecks,
    "Average Score": TrendingUp,
    "Best Score": Trophy,
};

// Splits "82%" -> { number: 82, suffix: "%" } so we can animate just the digits.
function splitValue(value: string) {
    const match = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    return { number: parseFloat(match[1]), suffix: match[2] };
}

export default function StatsCard({

    title,

    value

}: Props) {

    const Icon = ICONS[title] || Gauge;
    const parsed = splitValue(value);
    const isLoading = value === "...";

    const [display, setDisplay] = useState(0);
    const animatedOnce = useRef(false);

    useEffect(() => {

        if (!parsed || isLoading) return;

        // Only run the count-up the first time real data arrives.
        if (animatedOnce.current) {
            setDisplay(parsed.number);
            return;
        }
        animatedOnce.current = true;

        const duration = 900;
        const start = performance.now();
        const target = parsed.number;

        let frame: number;

        function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(target * eased * 10) / 10);
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        }

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (

        <motion.div
            className="stats-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >

            <div className="stats-icon">
                <Icon size={18} />
            </div>

            <h3>{title}</h3>

            {
                isLoading
                ?
                <div className="stats-skeleton skeleton" />
                :
                <h1>
                    {parsed ? `${display}${parsed.suffix}` : value}
                </h1>
            }

        </motion.div>

    );

}
