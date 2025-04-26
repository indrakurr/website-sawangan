import { useState } from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import SearchInput from "../../components/inputs/SearchInput";
import ModalAddProduct from "../../components/modal/manage-product/ModalAddProduct";
import { TableProductList } from "../../components/tables/manage-product/TableProductList";
import Pagination from "../../components/pagination/Pagination";
import { Plus } from "@phosphor-icons/react";

export default function ManageProduct() {
  const [collapse, setCollapse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

   const [isOpen, setIsOpen] = useState(false);

  // Jumlah total produk dummy
  const totalCount = 15;
  const itemsPerPage = 10;

  // Dummy product data
  const dummyProducts = [
    {
      id: 1,
      name: "Getuk Goreng Sokaraja",
      price: "Rp12.000",
      category: "Makanan",
      stock: 20,
    },
    {
      id: 2,
      name: "Wedang Uwuh",
      price: "Rp15.000",
      category: "Minuman",
      stock: 10,
    },
    {
      id: 3,
      name: "Gelang Batik",
      price: "Rp25.000",
      category: "Aksesoris",
      stock: 8,
    },
    {
      id: 4,
      name: "Nopia Khas Banyumas",
      price: "Rp18.000",
      category: "Makanan",
      stock: 30,
    },
    {
      id: 5,
      name: "Teh Serai Wangi",
      price: "Rp13.000",
      category: "Minuman",
      stock: 14,
    },
    {
      id: 6,
      name: "Kaos I Love Purwokerto",
      price: "Rp45.000",
      category: "Aksesoris",
      stock: 12,
    },
    {
      id: 7,
      name: "Kripik Tempe",
      price: "Rp10.000",
      category: "Makanan",
      stock: 40,
    },
    {
      id: 8,
      name: "Sirup Jahe Merah",
      price: "Rp22.000",
      category: "Minuman",
      stock: 18,
    },
    {
      id: 9,
      name: "Dompet Batik",
      price: "Rp30.000",
      category: "Aksesoris",
      stock: 6,
    },
    {
      id: 10,
      name: "Jenang Kudus",
      price: "Rp17.000",
      category: "Makanan",
      stock: 25,
    },
    {
      id: 11,
      name: "Kopi Banyumas",
      price: "Rp27.000",
      category: "Minuman",
      stock: 13,
    },
    {
      id: 12,
      name: "Topi Anyaman",
      price: "Rp35.000",
      category: "Aksesoris",
      stock: 7,
    },
    {
      id: 13,
      name: "Rengginang Pedas",
      price: "Rp11.000",
      category: "Makanan",
      stock: 22,
    },
    {
      id: 14,
      name: "Teh Hitam Celup",
      price: "Rp19.000",
      category: "Minuman",
      stock: 16,
    },
    {
      id: 15,
      name: "Gantungan Kunci Miniatur Poci",
      price: "Rp8.000",
      category: "Aksesoris",
      stock: 50,
    },
  ];

  // Filter produk berdasarkan query pencarian
  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Flex w="100%" h="100vh" bg="gray.100" overflow="hidden">
        {/* Sidebar */}
        <Box position="sticky" top={0} h="100vh" zIndex={10}>
          <SideBar collapse={collapse} setCollapse={setCollapse} />
        </Box>

        {/* Main content */}
        <Box flex="1" display="flex" flexDirection="column" maxH="100vh">
          {/* TopBar */}
          <Box position="sticky" top={0} zIndex={10} bg="white">
            <TopBar collapse={collapse} setCollapse={setCollapse} />
          </Box>

          {/* Scrollable content */}
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
                <div className="wrapper w-4/12">
                  <SearchInput
                    value={searchQuery}
                    onSearch={setSearchQuery} // Update search query state
                  />
                </div>
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

              {/* Tabel dan pagination */}
              <TableProductList
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                products={filteredProducts} // Pass filtered products
              />
              <Flex justifyContent="center" mt={4}>
                <Pagination
                  totalCount={filteredProducts.length} // Use filtered product count
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
    </>
  );
}
