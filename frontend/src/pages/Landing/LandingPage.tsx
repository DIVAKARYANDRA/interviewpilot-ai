import MainLayout from "../../layouts/MainLayout";
import LiveDemo from "../../components/landing/LiveDemo/LiveDemo";
import Hero from "../../components/landing/Hero/Hero";
import Features from "../../components/landing/Features/Features";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";

export default function LandingPage() {
  return (
    <MainLayout>

      <Hero />

      <Features />

      <HowItWorks />
      
      <LiveDemo />

    </MainLayout>
  );
}