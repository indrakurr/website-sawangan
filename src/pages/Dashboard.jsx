import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  IconButton,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import SideBar from "../components/navigation/SideBar";
import CardInfo from "../components/card/CardInfo";
import { ArrowDown2, Logout } from "iconsax-react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-iconly";
import {
  ClipboardText,
  ShoppingCart,
  UsersThree,
  Wallet,
  Plus,
} from "@phosphor-icons/react";

import BgCard from "../assets/bg-card-dashboard.png";

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
                      _hover={{ bg: "white" }}
                      padding={0}
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
        <Box p={6}>
          <Grid templateColumns="repeat(3, 1fr)" gap="6">
            <GridItem colSpan={2}>
              <Box
                w="100%"
                h="full"
                backgroundImage={`url(${BgCard})`}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                paddingX={6}
                paddingY={"48px"}
                borderRadius={"20px"}
              >
                <Text
                  fontSize="40px"
                  fontWeight="bold"
                  color="white"
                  wordBreak="break-word"
                  lineHeight={"1.2"}
                >
                  Pantau Penjualan, Atur Pengguna, Tingkatkan Kinerja Sawangan 1
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <CardInfo
                icon={Wallet}
                iconBg="#D61C4E"
                iconColor="white"
                title="Total Pendapatan"
                titleFontSize="20px"
                value="Rp 999.999.999"
                valueFontSize="36px"
              />
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(4, 1fr)" gap="6" marginTop={6}>
            <GridItem colSpan={1}>
              <CardInfo
                icon={ClipboardText}
                iconBg="rgba(214, 28, 78, 0.1)"
                iconColor="#D61C4E"
                title="Total Pesanan"
                titleFontSize="16px"
                value="1234"
                valueFontSize="32px"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <CardInfo
                icon={ShoppingCart}
                iconBg="rgba(247, 126, 33, 0.1)"
                iconColor="#F77E21"
                title="Total Produk"
                titleFontSize="16px"
                value="2345"
                valueFontSize="32px"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <CardInfo
                icon={UsersThree}
                iconBg="rgba(250, 194, 19, 0.1)"
                iconColor="#FAC213"
                title="Total Pengguna"
                titleFontSize="16px"
                value="3456"
                valueFontSize="32px"
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Button
                w="full"
                h="full"
                bg="white"
                borderRadius={"20px"}
                boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
                display={"flex"}
                justifyContent="space-between"
                padding={6}
                _hover={{
                  bg: "orange.500",
                  color: "white",
                }}
              >
                <Text
                  fontSize="32px"
                  fontWeight="bold"
                  color="inherit"
                  wordBreak="break-word"
                  lineHeight="1.2"
                  textAlign="left"
                >
                  Tambah <br /> Produk
                </Text>
                <Box
                  boxSize="56px"
                  bg="#F77E21"
                  borderRadius="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Plus
                    color="white"
                    weight="bold"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Box>
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Flex>
  );
}
