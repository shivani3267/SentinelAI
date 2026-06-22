import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden relative">

      <Navbar />
        <Hero/>
      <Footer />

    </div>
  );
}