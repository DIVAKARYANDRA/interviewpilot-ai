import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        borderBottom: "1px solid #1f2937",
        background: "#0f172a"
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "white"
        }}
      >
        InterviewPilot
      </Link>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center"
        }}
      >
        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <button
          style={{
            background: "#6366f1",
            border: "none",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px"
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}