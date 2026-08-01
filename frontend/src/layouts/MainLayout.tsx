import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "calc(100vh - 140px)",
          padding: "40px"
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}