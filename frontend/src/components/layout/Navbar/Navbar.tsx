import { Link } from "react-router-dom";

import { scrollToSection } from "../../../utils/scroll";

import "./Navbar.css";


export default function Navbar() {

    return (

        <header className="navbar">


            <div className="navbar-container">


                <div className="logo">

                    Interview
                    <span>
                        Pilot AI
                    </span>

                </div>


                <nav className="nav-links">


                    <button
                        onClick={() =>
                            scrollToSection("features")
                        }
                    >
                        Features
                    </button>


                    <button
                        onClick={() =>
                            scrollToSection("how-it-works")
                        }
                    >
                        How It Works
                    </button>


                    <button
                        onClick={() =>
                            scrollToSection("ai-demo")
                        }
                    >
                        AI Coach
                    </button>


                </nav>



                <div className="nav-actions">


                    <Link to="/login">

                        <button className="login-btn">

                            Login

                        </button>

                    </Link>



                    <Link to="/register">

                        <button className="register-btn">

                            Register

                        </button>

                    </Link>


                </div>


            </div>


        </header>

    );

}