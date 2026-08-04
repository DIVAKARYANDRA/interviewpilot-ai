import MainLayout from "../../layouts/MainLayout";
import LiveDemo from "../../components/landing/LiveDemo/LiveDemo";
import Hero from "../../components/landing/Hero/Hero";
import Features from "../../components/landing/Features/Features";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import Statistics from "../../components/landing/Statistics/Statistics";

export default function LandingPage() {
  return (
    <MainLayout>
      <Hero />

      <section id="features">
        <Features />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <div id="ai-demo">
        <LiveDemo />
      </div>

      <div id="statistics">
        <Statistics />
      </div>
      
    </MainLayout>
  );
}