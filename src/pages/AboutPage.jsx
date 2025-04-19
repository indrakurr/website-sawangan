import Navbar from "../components/navigation/Navbar";
import About1 from "../components/sections/About1";
import About2 from "../components/sections/About2";
import Time from "../components/sections/Time"
import Gallery from "../components/sections/Gallery"
import ContactUs from "../components/sections/ContactUs"
import Footer from "../components/sections/Footer"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AboutPage() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);
    
  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0 scroll-smooth">
      <Navbar />
      <section id="toko-sawangan">
        <About1 />
      </section>
      <section id="mengapa-kami">
        <About2 />
      </section>
      <section id="jam-operasional">
        <Time />
      </section>
      <section id="galeri">
        <Gallery />
      </section>
      <ContactUs />
      <Footer />
    </div>
  );
}
