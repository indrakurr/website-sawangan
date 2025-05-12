import { useState, useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import SearchInput from "../../components/inputs/SearchInput";
import Pagination from "../../components/pagination/Pagination";
import FilterButton from "../../components/buttons/FilterButton";
import { TableOrderList } from "../../components/tables/manage-order/TableOrderList";
import TableProductSkeleton from "../../components/skeleton/TableProductSkeleton";
import { useGetAdminOrdersQuery } from "../../store/store";

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

  const { data, isLoading } = useGetAdminOrdersQuery();

  const mapStatus = (apiStatus) => {
    switch (apiStatus) {
      case "PENDING":
        return "Belum Bayar";
      case "PACKAGED":
        return "Dikemas";
      case "SHIPPED":
        return "Dikirim";
      case "COMPLETED":
        return "Diterima";
      case "CANCELLED":
        return "Dibatalkan";
      default:
        return apiStatus;
    }
  };

  const allOrders = useMemo(() => {
    const raw = data?.data || [];
    return raw.map((order) => ({
      id: order.id,
      items: order.items,
      customerName: order.customerName,
      total: `Rp${order.totalAmount.toLocaleString("id-ID")}`,
      status: mapStatus(order.status),
    }));
  }, [data]);

  const filteredOrders = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allOrders.filter((order) => {
      const matchQuery =
        order.items.some((item) => item.name.toLowerCase().includes(query)) ||
        order.customerName.toLowerCase().includes(query);
      const matchStatus =
        activeStatus === "Semua" ? true : order.status === activeStatus;
      return matchQuery && matchStatus;
    });
  }, [allOrders, searchQuery, activeStatus]);

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
              <div className="wrapper w-4/12">
                <SearchInput value={searchQuery} onSearch={setSearchQuery} />
              </div>
            </Flex>

            {isLoading ? (
              <TableProductSkeleton rows={itemsPerPage} />
            ) : (
              <>
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
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
