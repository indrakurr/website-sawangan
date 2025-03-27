import { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import SearchBar from "../components/navigation/SearchBar";
import CardProduk from "../components/card/CardProduk";
import Footer from "../components/sections/Footer";
import PaginationComponent from "../components/pagination/Pagination";
import { Flex } from "@chakra-ui/react";

export default function ProductPage() {
  const productsPerPage = 8; // Jumlah produk per halaman
  const totalProducts = 100; // Total produk yang akan ditampilkan (bisa diganti dengan jumlah data dari API)

  const [currentPage, setCurrentPage] = useState(1);

  // Menghitung indeks awal dan akhir untuk slicing data
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0">
      <Navbar />
      <SearchBar />
      <Flex
        justify="center"
        gap={6}
        wrap="wrap"
        marginTop="172px"
        marginBottom="52px"
        paddingX={{ lg: "80px" }}
      >
        {Array.from({ length: totalProducts })
          .slice(startIndex, endIndex)
          .map((_, index) => (
            <CardProduk
              key={index}
              flexBasis={{ base: "48%", sm: "48%", md: "48%", lg: "23%" }}
              maxWidth={{ base: "48%", sm: "48%", md: "48%", lg: "23%" }}
            />
          ))}
      </Flex>

      {/* Pagination */}
      <Flex justify="center" marginBottom="40px">
        <PaginationComponent
          totalCount={totalProducts}
          pageSize={productsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Flex>

      <Footer />
    </div>
  );
}
