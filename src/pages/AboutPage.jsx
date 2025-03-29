import Navbar from "../components/navigation/Navbar";
import About1 from "../components/sections/About1";
import About2 from "../components/sections/About2";
import Time from "../components/sections/Time"
import Gallery from "../components/sections/Gallery"
import ContactUs from "../components/sections/ContactUs"
import Footer from "../components/sections/Footer"

export default function AboutPage () {
    return (
        <div className="overflow-x-hidden w-full max-w-screen mx-0">
            <Navbar />
            <About1 />
            <About2 />
            <Time />
            <Gallery />
            <ContactUs />
            <Footer />
        </div>
    );
}