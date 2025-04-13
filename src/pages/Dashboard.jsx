import { useState } from "react";
import { Box, Flex, Image, IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import SideBar from "../components/navigation/SideBar";
import { ArrowDown2, Logout } from "iconsax-react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-iconly";

export default function Dashboard() {
  const [collapse, setCollapse] = useState(false);

  const sidebarWidth = collapse ? 96 : 312;

  return (
    <Flex w="100%" minH="100vh" bg="gray.100">
      {/* Sidebar */}
      <SideBar collapse={collapse} setCollapse={setCollapse} />

      {/* Main Content */}
      <Box flex="1" transition="margin-left 0.3s ease">
        {/* TopBar */}
        <Box
          bg="white"
          w="100%"
          px={8}
          py={6}
          transition="all 0.3s ease"
          boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.05)"}
        >
          <Flex justifyContent="space-between" align="center">
            <Box onClick={() => setCollapse(!collapse)} cursor="pointer">
              {collapse ? (
                <ArrowRightSquare color="gray" size="32px" />
              ) : (
                <ArrowLeftSquare color="gray" size="32px" />
              )}
            </Box>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Flex gap="4px" align="center" cursor="pointer">
                  <Image
                    boxSize="36px"
                    borderRadius="full"
                    src="https://i.pravatar.cc/300?u=111"
                    alt="profile-image"
                  />
                  <Box marginLeft={3}>
                    <Text
                      fontSize="14px"
                      fontWeight="semibold"
                      color="black"
                      wordBreak="break-word"
                    >
                      Lorem Ipsum
                    </Text>
                    <Text
                      fontSize="12px"
                      fontWeight="regular"
                      color="gray.400"
                      wordBreak="break-word"
                    >
                      loremipsum@gmail.com
                    </Text>
                  </Box>
                  <ArrowDown2 color="black" size="16px" />
                </Flex>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content
                    padding="16px"
                    borderRadius="12px"
                    backgroundColor="white"
                    boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
                  >
                    <Menu.Item
                      color="red"
                      value="logout"
                      _hover={{ bg: "#FFFEE5" }}
                    >
                      <Logout
                        style={{ width: "24px", height: "24px" }}
                        color="red"
                      />
                      Keluar
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Flex>
        </Box>

        {/* Konten Utama */}
        <Box p={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="black">
            Selamat Datang di Dashboard
          </Text>
          <Text color="gray.700">
            Ini adalah halaman utama dashboard. Kamu bisa menambahkan konten di
            sini nanti.
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
