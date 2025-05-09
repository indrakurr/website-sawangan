import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import SearchInput from "../../components/inputs/SearchInput";
import Pagination from "../../components/pagination/Pagination";
import { TableUserList } from "../../components/tables/manage-user/TableUserList";
import { useGetAdminUsersQuery } from "../../store/store";
import TableProductSkeleton from "../../components/skeleton/TableProductSkeleton";

export default function ManageUser() {
  const [collapse, setCollapse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;

  const { data, isLoading } = useGetAdminUsersQuery();
  const allUsers = data?.data || [];

  // Filter users based on search query
  const filteredUsers = allUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
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
            Kelola Pengguna
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
            {/* Search Input */}
            <div className="wrapper w-4/12">
              <SearchInput value={searchQuery} onSearch={setSearchQuery} />
            </div>

            {isLoading ? (
              <TableProductSkeleton />
            ) : (
              <TableUserList
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                users={filteredUsers}
              />
            )}

            <Flex justifyContent="center" mt={4}>
              <Pagination
                totalCount={filteredUsers.length}
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
