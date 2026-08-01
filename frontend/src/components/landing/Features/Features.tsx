import "./Features.css";

const features = [
  {
    title: "AI Mock Interviews",
    description:
      "Practice interviews tailored to your target company, role and experience level."
  },
  {
    title: "Instant AI Feedback",
    description:
      "Receive technical, communication and confidence scores after every answer."
  },
  {
    title: "Voice Interview",
    description:
      "Talk naturally with an AI interviewer just like a real interview."
  },
  {
    title: "Learning Roadmap",
    description:
      "Get personalized learning recommendations based on your weaknesses."
  }
];

export default function Features() {
  return (
    <section className="features" id="features">

      <h2>Everything You Need to Crack Interviews</h2>

      <p>
        Built specifically for software engineers preparing for
        product companies.
      </p>

      <div className="feature-grid">

        {features.map((item) => (

          <div className="feature-card" key={item.title}>

            <h3>{item.title}</h3>

            <p>{item.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}