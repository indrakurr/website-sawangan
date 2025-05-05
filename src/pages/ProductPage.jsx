import { useState } from "react";
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
} from "@chakra-ui/react";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
         <Flex
           justify="center"
           gap={6}
           wrap="wrap"
           marginTop="172px"
           marginBottom="52px"
           paddingX={{ lg: "80px" }}
         >
           {Array.from({ length: 24 }).map((_, i) => (
             <Box
               key={i}
               w={{ base: "65%", md: "31%", lg: "19%" }}
               h={"390px"}
               borderRadius="16px"
               overflow="hidden"
               bg="white"
               boxShadow="0px 4px 30px rgba(0, 0, 0, 0.05)"
             >
               <Skeleton height={48} borderRadius="none" {...skeletonStyle} />
               <Box paddingX={4}>
                 <SkeletonText
                   mt="8"
                   noOfLines={2}
                   spacing="3"
                   {...skeletonStyle}
                 />
                 <Skeleton
                   height="20px"
                   mt="2"
                   width="60%"
                   {...skeletonStyle}
                 />
                 <Flex justify="flex-end" mt="4">
                   <SkeletonCircle size="8" {...skeletonStyle} />
                 </Flex>
               </Box>
             </Box>
           ))}
         </Flex>
         <Footer />
       </div>
     );
   }

  if (error) {
    return (
      <div className="overflow-x-hidden w-full min-h-screen max-w-screen mx-0 bg-[#F0F3F7]">
        <Navbar />
        <SearchBar />
        <Flex minH={"400px"} justifyContent={"center"} alignItems={"center"} marginTop={"100px"}>
          <Text color="gray.500">Gagal memuat produk</Text>
        </Flex>
        <Footer />
      </div>
    );
  }

  const allProducts = data?.data || [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = allProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
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
          {currentProducts.map((product) => (
            <CardProduk key={product.id} product={product} />
          ))}
        </Flex>

        <Flex justify="center" marginBottom="40px">
          <PaginationComponent
            totalCount={allProducts.length}
            pageSize={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Flex>
        <Footer />
      </div>
      <Toaster/>
    </>
  );
}
