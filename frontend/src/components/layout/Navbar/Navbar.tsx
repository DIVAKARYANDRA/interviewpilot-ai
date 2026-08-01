import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">

        Interview<span>Pilot</span>

      </div>

      <nav>

        <a href="#features">Features</a>

        <a href="#how-it-works">How it Works</a>

        <a href="#pricing">Pricing</a>

        <Link to="/login">Login</Link>

      </nav>

      <button>

        Get Started

      </button>

    </header>
  );
}