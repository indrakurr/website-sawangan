import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import SearchInput from "../../components/inputs/SearchInput";
import Pagination from "../../components/pagination/Pagination";
import { TableUserList } from "../../components/tables/manage-user/TableUserList";

export default function ManageUser() {
  const [collapse, setCollapse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10;

  // Dummy users
  const dummyUsers = [
    {
      id: "1",
      fullName: "Budi Santoso",
      email: "budi@example.com",
      phone: "081234567890",
    },
    {
      id: "2",
      fullName: "Siti Aminah",
      email: "siti@example.com",
      phone: "081234567891",
    },
    {
      id: "3",
      fullName: "Agus Riyanto",
      email: "agus@example.com",
      phone: "081234567892",
    },
    {
      id: "4",
      fullName: "Nur Aini",
      email: "nur@example.com",
      phone: "081234567893",
    },
    {
      id: "5",
      fullName: "Dian Sastro",
      email: "dian@example.com",
      phone: "081234567894",
    },
    {
      id: "6",
      fullName: "Ahmad Fauzi",
      email: "ahmad@example.com",
      phone: "081234567895",
    },
    {
      id: "7",
      fullName: "Rina Marlina",
      email: "rina@example.com",
      phone: "081234567896",
    },
    {
      id: "8",
      fullName: "Ilham Firmansyah",
      email: "ilham@example.com",
      phone: "081234567897",
    },
    {
      id: "9",
      fullName: "Dewi Lestari",
      email: "dewi@example.com",
      phone: "081234567898",
    },
    {
      id: "10",
      fullName: "Andi Wijaya",
      email: "andi@example.com",
      phone: "081234567899",
    },
    {
      id: "11",
      fullName: "Tasya Kamila",
      email: "tasya@example.com",
      phone: "081234567900",
    },
    {
      id: "12",
      fullName: "Fajar Nugroho",
      email: "fajar@example.com",
      phone: "081234567901",
    },
    {
      id: "13",
      fullName: "Mira Andini",
      email: "mira@example.com",
      phone: "081234567902",
    },
    {
      id: "14",
      fullName: "Rahmat Hidayat",
      email: "rahmat@example.com",
      phone: "081234567903",
    },
    {
      id: "15",
      fullName: "Lia Amalia",
      email: "lia@example.com",
      phone: "081234567904",
    },
  ];

  // Filter users based on search query
  const filteredUsers = dummyUsers.filter((user) => {
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

            <TableUserList
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              users={filteredUsers}
            />
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
