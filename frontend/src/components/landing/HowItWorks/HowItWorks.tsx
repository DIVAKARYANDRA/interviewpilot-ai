import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Choose Your Interview",
    description:
      "Select your target company, role, skills and difficulty level."
  },
  {
    number: "02",
    title: "Interview with AI",
    description:
      "Answer realistic interview questions generated specifically for you."
  },
  {
    number: "03",
    title: "Improve & Get Hired",
    description:
      "Receive detailed AI feedback, learning roadmap and readiness score."
  }
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">

      <h2>How InterviewPilot Works</h2>

      <div className="steps">

        {steps.map((step) => (
          <div className="step-card" key={step.number}>

            <div className="step-number">

              {step.number}

            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

          </div>
        ))}

      </div>

    </section>
  );
}