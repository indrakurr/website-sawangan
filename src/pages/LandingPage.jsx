import Navbar from "../components/navigation/Navbar";
import HeroSection from "../components/sections/HeroSection";
import Category from "../components/sections/Category"
import BestProduct from "../components/sections/BestProduct";
import Benefit from "../components/sections/Benefit";
import ExploreProduct from "../components/sections/ExploreProduct";
import Footer from "../components/sections/Footer";

export default function LandingPage () {
    return (
      <div className="overflow-x-hidden w-full max-w-screen mx-0">
        <Navbar />
        <HeroSection />
        <Category />
        <BestProduct />
        <Benefit />
        <ExploreProduct />
        <Footer />
      </div>
    );
}