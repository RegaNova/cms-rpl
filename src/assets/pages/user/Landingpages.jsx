import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Stats from "../components/sections/Stats";
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </>
  );
}
