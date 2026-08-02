import { useNavigate } from "react-router-dom";
import "./HeroCard.css";

import { useEffect,useState } from "react";
import { getUser } from "../../../hooks/useAuth";

export default function HeroCard() {

    const navigate = useNavigate();
    const [user,setUser]=useState<any>(null);


        useEffect(()=>{

            getUser()
            .then((data:any)=>{

                setUser(data);

            });

        },[]);

    return (

        <section className="hero-card">

            <h1>
            Welcome back {user?.name || ""} 👋
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