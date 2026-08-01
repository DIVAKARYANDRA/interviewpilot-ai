import MainLayout from "../../layouts/MainLayout";

export default function LandingPage() {
  return (
    <MainLayout>
      <section
        style={{
          textAlign: "center",
          padding: "100px 20px"
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            marginBottom: "20px"
          }}
        >
          Master Your Dream Job with AI
        </h1>

        <p
          style={{
            maxWidth: "850px",
            margin: "auto",
            fontSize: "22px",
            color: "#cbd5e1"
          }}
        >
          Practice realistic AI interviews, receive detailed feedback,
          improve weak areas, and become interview-ready for top product
          companies.
        </p>
      </section>
    </MainLayout>
  );
}