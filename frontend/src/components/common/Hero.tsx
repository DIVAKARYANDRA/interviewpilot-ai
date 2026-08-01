export default function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "120px 20px"
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          color: "white",
          fontWeight: 800
        }}
      >
        Master Your Dream Job with AI
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "22px",
          maxWidth: "800px",
          margin: "30px auto"
        }}
      >
        AI-powered interview preparation platform with personalized mock
        interviews, instant feedback, company-specific questions and voice
        interviews.
      </p>

      <button
        style={{
          marginTop: "30px",
          padding: "18px 36px",
          fontSize: "18px",
          border: "none",
          borderRadius: "12px",
          background: "#6366f1",
          color: "#fff"
        }}
      >
        Start Free
      </button>
    </section>
  );
}