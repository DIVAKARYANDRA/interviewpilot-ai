import { useNavigate } from "react-router-dom";

import "./QuickActions.css";

export default function QuickActions() {

    const navigate = useNavigate();

    return (

        <section className="quick-actions">

            <h2>

                Quick Actions

            </h2>

            <div className="actions-grid">

                <button
                    onClick={() =>
                        navigate("/interview/setup")
                    }
                >
                    💻 Text Interview
                </button>

                <button
                    onClick={() =>
                        navigate("/interview/setup")
                    }
                >
                    🎙 Voice Interview
                </button>

                <button disabled>
                    📄 Resume Analyzer
                    <br />
                    <small>Coming Soon</small>
                </button>

            </div>

        </section>

    );

}