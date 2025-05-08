import { useState } from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import SearchInput from "../../components/inputs/SearchInput";
import ModalAddProduct from "../../components/modal/manage-product/ModalAddProduct";
import { TableProductList } from "../../components/tables/manage-product/TableProductList";
import Pagination from "../../components/pagination/Pagination";
import { Plus } from "@phosphor-icons/react";
import FilterButton from "../../components/buttons/FilterButton";
import { Toaster } from "../../components/ui/toaster";
import { useGetProductsQuery } from "../../store/store";
import TableProductSkeleton from "../../components/skeleton/TableProductSkeleton";

export default function ManageProduct() {
  const [collapse, setCollapse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const { data, isLoading, refetch } = useGetProductsQuery();
  const allProducts = data?.data || [];

  const categoryOptions = ["Semua", "Makanan", "Minuman", "Aksesoris"];

  const filteredProducts = allProducts.filter((product) => {
    const matchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      activeCategory === "Semua" || product.category === activeCategory;
    return matchQuery && matchCategory;
  });

  const itemsPerPage = 10;

  return (
    <>
      <Flex w="100%" h="100vh" bg="gray.100" overflow="hidden">
        <Box position="sticky" top={0} h="100vh" zIndex={10}>
          <SideBar collapse={collapse} setCollapse={setCollapse} />
        </Box>

        <Box flex="1" display="flex" flexDirection="column" maxH="100vh">
          <Box position="sticky" top={0} zIndex={10} bg="white">
            <TopBar collapse={collapse} setCollapse={setCollapse} />
          </Box>

          <Box flex="1" overflowY="auto" p={6} bg="gray.100">
            <Text fontSize="24px" fontWeight="bold" color="black">
              Kelola Daftar Produk
            </Text>

            <Flex
              bg="white"
              borderRadius="xl"
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
              direction="column"
              gap="1.5rem"
              p="1.5rem"
              mt={6}
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex gap={3}>
                  {categoryOptions.map((cat) => (
                    <FilterButton
                      key={cat}
                      label={cat}
                      isActive={activeCategory === cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                      }}
                    />
                  ))}
                </Flex>
                <Flex w={"full"} paddingX={"20px"}>
                  <SearchInput value={searchQuery} onSearch={setSearchQuery} />
                </Flex>
                <Button
                  size={"sm"}
                  bg={"orange.500"}
                  color={"white"}
                  rounded={"xl"}
                  py={5}
                  _hover={{ bg: "orange.600" }}
                  onClick={() => setIsOpen(true)}
                >
                  <Plus weight="bold" />
                  <Text lineHeight="1" whiteSpace="nowrap">
                    Tambah Produk
                  </Text>
                </Button>
              </Flex>

              {isLoading ? (
                <TableProductSkeleton rows={10} />
              ) : (
                <TableProductList
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  products={filteredProducts}
                  isLoading={isLoading}
                  refetch={refetch}
                />
              )}
              <Flex justifyContent="center" mt={4}>
                <Pagination
                  totalCount={filteredProducts.length}
                  pageSize={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <ModalAddProduct isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Toaster />
    </>
  );
}
