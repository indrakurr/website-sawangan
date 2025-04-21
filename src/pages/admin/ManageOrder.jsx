import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import SearchInput from "../../components/inputs/SearchInput";
import Pagination from "../../components/pagination/Pagination";
import FilterButton from "../../components/buttons/FilterButton";
import { TableOrderList } from "../../components/tables/manage-order/TableOrderList";

export default function ManageOrder() {
  const [collapse, setCollapse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("Semua");

  const itemsPerPage = 10;

  const statusOptions = [
    "Semua",
    "Belum Bayar",
    "Dikemas",
    "Dikirim",
    "Diterima",
    "Dibatalkan",
  ];


  // Dummy orders
  const dummyOrders = [
    {
      id: "ORD123456789",
      productName: "Getuk Goreng Sokaraja",
      customerName: "Budi Santoso",
      total: "Rp24.000",
      status: "Belum Bayar",
    },
    {
      id: "ORD987654321",
      productName: "Teh Serai Wangi",
      customerName: "Siti Aminah",
      total: "Rp13.000",
      status: "Dikirim",
    },
    {
      id: "ORD456123789",
      productName: "Dompet Batik",
      customerName: "Agus Riyanto",
      total: "Rp30.000",
      status: "Diterima",
    },
    {
      id: "ORD001122334",
      productName: "Kopi Banyumas",
      customerName: "Nur Aini",
      total: "Rp27.000",
      status: "Dibatalkan",
    },
    {
      id: "ORD234567891",
      productName: "Sambal Terasi",
      customerName: "Dian Sastro",
      total: "Rp15.000",
      status: "Belum Bayar",
    },
    {
      id: "ORD345678912",
      productName: "Keripik Tempe",
      customerName: "Ahmad Fauzi",
      total: "Rp12.000",
      status: "Dikirim",
    },
    {
      id: "ORD456789123",
      productName: "Kaos Batik Banyumas",
      customerName: "Rina Marlina",
      total: "Rp45.000",
      status: "Diterima",
    },
    {
      id: "ORD567891234",
      productName: "Gula Semut",
      customerName: "Ilham Firmansyah",
      total: "Rp20.000",
      status: "Dibatalkan",
    },
    {
      id: "ORD678912345",
      productName: "Batik Tulis",
      customerName: "Dewi Lestari",
      total: "Rp120.000",
      status: "Diterima",
    },
    {
      id: "ORD789123456",
      productName: "Sambal Pecel",
      customerName: "Andi Wijaya",
      total: "Rp18.000",
      status: "Belum Bayar",
    },
    {
      id: "ORD891234567",
      productName: "Wedang Uwuh",
      customerName: "Tasya Kamila",
      total: "Rp22.000",
      status: "Dikirim",
    },
    {
      id: "ORD912345678",
      productName: "Kopi Lanang",
      customerName: "Fajar Nugroho",
      total: "Rp28.000",
      status: "Dikirim",
    },
    {
      id: "ORD101112131",
      productName: "Miniatur Tugu Poci",
      customerName: "Mira Andini",
      total: "Rp55.000",
      status: "Diterima",
    },
    {
      id: "ORD121314151",
      productName: "Bolu Kukus Banyumas",
      customerName: "Rahmat Hidayat",
      total: "Rp17.000",
      status: "Belum Bayar",
    },
    {
      id: "ORD131415161",
      productName: "Teh Hitam Kemasan",
      customerName: "Lia Amalia",
      total: "Rp19.000",
      status: "Dibatalkan",
    },
    {
      id: "ORD141516171",
      productName: "Sirup Jahe Merah",
      customerName: "Kevin Alfiansyah",
      total: "Rp25.000",
      status: "Diterima",
    },
    {
      id: "ORD151617181",
      productName: "Kacang Tojin",
      customerName: "Nanda Pratama",
      total: "Rp11.000",
      status: "Belum Bayar",
    },
    {
      id: "ORD678912345",
      productName: "Batik Tulis",
      customerName: "Dewi Lestari",
      total: "Rp120.000",
      status: "Dikemas",
    },
    {
      id: "ORD789123456",
      productName: "Sambal Pecel",
      customerName: "Andi Wijaya",
      total: "Rp18.000",
      status: "Dikemas",
    },
    {
      id: "ORD891234567",
      productName: "Wedang Uwuh",
      customerName: "Tasya Kamila",
      total: "Rp22.000",
      status: "Dikemas",
    },
  ];

  // Filter pesanan berdasarkan query pencarian
  const filteredOrders = dummyOrders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchQuery =
      order.productName.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query);

    const matchStatus =
      activeStatus === "Semua" ? true : order.status === activeStatus;

    return matchQuery && matchStatus;
  });


  return (
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
            Kelola Pesanan
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
              {/* Filter Buttons */}
              <Flex gap={3}>
                {statusOptions.map((status) => (
                  <FilterButton
                    key={status}
                    label={status}
                    isActive={activeStatus === status}
                    onClick={() => {
                      setActiveStatus(status);
                      setCurrentPage(1);
                    }}
                  />
                ))}
              </Flex>

              {/* Search Input */}
              <div className="wrapper w-4/12">
                <SearchInput value={searchQuery} onSearch={setSearchQuery} />
              </div>
            </Flex>

            <TableOrderList
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              orders={filteredOrders}
            />
            <Flex justifyContent="center" mt={4}>
              <Pagination
                totalCount={filteredOrders.length}
                pageSize={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
