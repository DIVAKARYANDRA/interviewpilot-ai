import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      {/* Background */}
      <div className="hero-bg">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <div className="badge">
          🚀 AI Powered Interview Platform
        </div>

        <h1>
          Crack Your
          <br />
          Dream Job
          <span> with AI</span>
        </h1>

        <p>
          Practice realistic AI interviews, receive instant evaluation,
          discover your weak areas and become interview-ready for
          Amazon, Google, Microsoft and top product companies.
        </p>

        <div className="hero-buttons">

          <Link to="/register">
            <button>
              Start Free →
            </button>
          </Link>

          <Link to="/login">
            <button className="secondary">
              Login
            </button>
          </Link>

        </div>

        <div className="hero-stats">

          <div>
            <h2>10+</h2>
            <span>Interview Types</span>
          </div>

          <div>
            <h2>95%</h2>
            <span>Evaluation Accuracy</span>
          </div>

          <div>
            <h2>24/7</h2>
            <span>AI Available</span>
          </div>

        </div>

      </motion.div>

    </section>
  );
}