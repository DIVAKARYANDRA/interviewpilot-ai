import { useEffect, useState } from "react";
import { Code2, MessageCircle, Shield, Gauge } from "lucide-react";
import "./ScoreCard.css";

interface Props {

    title:string;

    score:number;

}

const ICONS: Record<string, typeof Code2> = {
    "Technical": Code2,
    "Communication": MessageCircle,
    "Confidence": Shield,
};

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function tone(score: number) {
    if (score >= 80) return "high";
    if (score >= 50) return "mid";
    return "low";
}

export default function ScoreCard({

    title,

    score

}:Props){

    const Icon = ICONS[title] || Gauge;
    const [animated, setAnimated] = useState(0);

    useEffect(() => {

        const duration = 900;
        const start = performance.now();

        let frame: number;

        function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimated(Math.round(score * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
        }

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);

    }, [score]);

    const offset = CIRCUMFERENCE - (animated / 100) * CIRCUMFERENCE;

    return(

        <div className={`score-card tone-${tone(score)}`}>

            <div className="score-card-ring">

                <svg viewBox="0 0 100 100">

                    <circle

                        className="ring-track"

                        cx="50" cy="50" r={RADIUS}

                    />

                    <circle

                        className="ring-fill"

                        cx="50" cy="50" r={RADIUS}

                        style={{

                            strokeDasharray: CIRCUMFERENCE,

                            strokeDashoffset: offset

                        }}

                    />

                </svg>

                <div className="ring-center">

                    <span className="ring-value">{animated}</span>
                    <span className="ring-percent">%</span>

                </div>

            </div>

            <div className="score-card-icon">
                <Icon size={16} />
            </div>

            <h3>

                {title}

            </h3>

        </div>

    );

}
