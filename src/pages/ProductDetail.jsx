import Navbar from "../components/navigation/Navbar";
import SearchBar from "../components/navigation/SearchBar";
import ProductInfo from "../components/product-details/ProductInfo";
import ProductDescription from "../components/product-details/ProductDescription";
import ProductRating from "../components/product-details/ProductRating"
import Footer from "../components/sections/Footer"

export default function ProductDetail() {
  return (
    <div
      className="overflow-x-hidden w-full max-w-screen"
      style={{
        backgroundColor: "#F0F3F7",
        width: "100vw",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <SearchBar />
      <ProductInfo />
      <ProductDescription />
      <ProductRating />
      <Footer />
    </div>
  );
}
