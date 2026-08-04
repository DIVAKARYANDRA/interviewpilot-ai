import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareText, Mic, Sparkles } from "lucide-react";
import { getUser } from "../../../hooks/useAuth";
import "./HeroCard.css";

export default function HeroCard() {

    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {

        getUser()
        .then((data: any) => {

            setUser(data);

        });

    }, []);

    const firstName = user?.name ? String(user.name).split(" ")[0] : "";

    return (

        <motion.section
            className="hero-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >

            <span className="hero-orb" aria-hidden="true" />

            <div className="hero-card-inner">

                <span className="hero-badge">
                    <Sparkles size={13} />
                    AI Interview Coach
                </span>

                <h1>
                    Welcome back{firstName ? `, ${firstName}` : ""}
                </h1>

                <p>
                    Practice realistic AI interviews and improve with
                    personalized feedback.
                </p>

                <div className="hero-actions">

                    <button
                        onClick={() => navigate("/interview/setup")}
                    >
                        <MessageSquareText size={16} />
                        Start Interview
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/interview/setup")}
                    >
                        <Mic size={16} />
                        Voice Interview
                    </button>

                </div>

            </div>

        </motion.section>

    );

}
