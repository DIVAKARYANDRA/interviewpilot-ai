import "./LiveDemo.css";

export default function LiveDemo() {

  return (

    <section className="live-demo">

      <h2>See InterviewPilot in Action</h2>

      <div className="demo-card">

        <div className="ai">

          🤖 InterviewPilot

          <p>
            Explain Dependency Injection in FastAPI.
          </p>

        </div>

        <div className="user">

          👨 Candidate

          <p>
            Dependency Injection allows FastAPI to automatically provide
            required dependencies like database sessions...
          </p>

        </div>

        <div className="score">

          <strong>AI Evaluation</strong>

          <p>Technical : 92%</p>

          <p>Communication : 88%</p>

          <p>Confidence : 94%</p>

        </div>

      </div>

    </section>

  );

}