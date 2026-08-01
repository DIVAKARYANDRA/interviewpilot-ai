import { useNavigate } from "react-router-dom";
import "./HeroCard.css";

export default function HeroCard() {

    const navigate = useNavigate();

    return (

        <section className="hero-card">

            <h1>

                Welcome back 👋

            </h1>

            <p>

                Practice realistic AI interviews and improve with
                personalized feedback.

            </p>

            <div className="hero-actions">

                <button
                    onClick={() => navigate("/interview/setup")}
                >
                    Start Interview
                </button>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/interview/setup")}
                >
                    Voice Interview
                </button>

            </div>

        </section>

    );

}