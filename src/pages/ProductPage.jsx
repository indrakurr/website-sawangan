import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../store/store";
import Navbar from "../components/navigation/Navbar";
import SearchBar from "../components/navigation/SearchBar";
import CardProduk from "../components/card/CardProduk";
import Footer from "../components/sections/Footer";
import PaginationComponent from "../components/pagination/Pagination";
import { Toaster } from "../components/ui/toaster";
import {
  Flex,
  Text,
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SimpleGrid,
} from "@chakra-ui/react";

export default function ProductPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category") || "Semua";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data, isLoading, error } = useGetProductsQuery();

  const skeletonStyle = {
    variant: "shine",
    css: {
      "--start-color": "#EDF2F7",
      "--end-color": "#E2E8F0",
    },
  };

  if (isLoading) {
    return (
      <div className="overflow-x-hidden w-full min-h-screen max-w-screen mx-0 bg-[#F0F3F7]">
        <Navbar />
        <SearchBar />
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4 }}
          gap={{ base: 2, md: 6 }}
          gapY={{ base: 2, md: 6 }}
          px={{ base: 2, md: 6, lg: 60 }}
          mt={{ base: "135px", lg: "172px" }}
          mb="52px"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Box
              key={i}
              borderRadius="16px"
              overflow="hidden"
              bg="white"
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)"
              h="full"
            >
              <Skeleton height="192px" {...skeletonStyle} />
              <Box px={4} pt={4} pb={6}>
                <SkeletonText
                  mt="2"
                  noOfLines={2}
                  spacing="2"
                  {...skeletonStyle}
                />
                <Skeleton height="20px" mt="2" width="60%" {...skeletonStyle} />
                <Flex justify="flex-end" mt="4">
                  <SkeletonCircle size="8" {...skeletonStyle} />
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-x-hidden w-full min-h-screen max-w-screen mx-0 bg-[#F0F3F7]">
        <Navbar />
        <SearchBar />
        <Flex
          minH={"400px"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"100px"}
        >
          <Text color="gray.500">Gagal memuat produk</Text>
        </Flex>
        <Footer />
      </div>
    );
  }

  const allProducts = data?.data || [];

  const filteredProducts = allProducts.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "Semua" || product.category === selectedCategory;
    return nameMatch && categoryMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
        <Navbar />
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4 }}
          gap={{ base: 2, md: 4 }}
          gapY={{ base: 2, md: 4 }}
          px={{ base: 2, md: 6, lg: 60 }}
          mt={{ base: "135px", lg: "172px" }}
          mb="52px"
        >
          {currentProducts.map((product) => (
            <CardProduk key={product.id} product={product} />
          ))}
        </SimpleGrid>
        <Flex justify="center" marginBottom="40px">
          <PaginationComponent
            totalCount={filteredProducts.length}
            pageSize={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Flex>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
