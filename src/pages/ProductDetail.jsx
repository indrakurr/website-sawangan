import { useParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import SearchBar from "../components/navigation/SearchBar";
import ProductInfo from "../components/product-details/ProductInfo";
import ProductDescription from "../components/product-details/ProductDescription";
import ProductRating from "../components/product-details/ProductRating";
import Footer from "../components/sections/Footer";
import { useGetProductByIdQuery } from "../store/store";
import { Spinner, Center, Text } from "@chakra-ui/react";
import ProductDetailSkeleton from "../components/skeleton/ProductDetailSkeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const product = data?.data;

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <Center minH="100vh">
        <Text>Gagal memuat produk.</Text>
      </Center>
    );
  }

  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
      <Navbar />
      <ProductInfo product={product} />
      <ProductDescription product={product} />
      <ProductRating product={product} />
      <Footer />
    </div>
  );
}
