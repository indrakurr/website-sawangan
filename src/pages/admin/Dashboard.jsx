import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import SideBar from "../../components/navigation/SideBar";
import TopBar from "../../components/navigation/TopBar";
import CardInfo from "../../components/card/CardInfo";
import {
  ClipboardText,
  ShoppingCart,
  UsersThree,
  Wallet,
  Plus,
} from "@phosphor-icons/react";

import BgCard from "../../assets/bg-card-dashboard.png";

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
        <TopBar collapse={collapse} setCollapse={setCollapse} />

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
                  bg: "#FAC213",
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
