import {
  Box,
  ButtonGroup,
  Container,
  Text,
  VStack,
  Image,
  Flex,
  Button,
  Portal,
  Menu,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/sections/Footer";
import FilterButton from "../components/buttons/FilterButton";
import CartOrder from "../components/card/CartOrder";
import { Toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown2,
  ArrowLeft2,
  PasswordCheck,
  Logout,
  Box1,
} from "iconsax-react";
import { User } from "react-iconly";
import MyOrderSkeleton from "../components/skeleton/MyOrderSkeleton";
import EmptyCartImg from "../assets/empty-cart.png"
import {
  useGetOrdersQuery,
  useLogoutMutation,
  useGetProfileQuery,
} from "../store/store";

const STATUS_MAPPING = {
  "Belum Bayar": "PENDING",
  Dikemas: "PACKAGED",
  Dikirim: "SHIPPED",
  Selesai: "COMPLETED",
  Dibatalkan: "CANCELLED",
};

export default function MyOrder() {
  const [activeFilter, setActiveFilter] = useState("Belum Bayar");
  const [activePage] = useState("orders");
  const buttonLabels = [
    "Semua",
    "Belum Bayar",
    "Dikemas",
    "Dikirim",
    "Selesai",
    "Dibatalkan",
  ];

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data: profileData } = useGetProfileQuery();

  const fullName = profileData?.data?.fullName || "Pengguna";
  const email = profileData?.data?.email || "-";
  const avatar =
    profileData?.data?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;

  const { data, isLoading } = useGetOrdersQuery();
  const allOrders = data?.data || [];
  const filteredOrders =
    activeFilter === "Semua"
      ? allOrders
      : allOrders.filter(
          (order) => order.status === STATUS_MAPPING[activeFilter]
        );

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Gagal logout", err);
    }
  };

  return (
    <>
      <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
        <Navbar />
        <Container paddingX={{ base: "0px", lg: "80px" }}>
          <Flex
            flexDirection={{ base: "column", lg: "row" }}
            marginTop={{ base: "72px", lg: "89px" }}
            marginBottom={{ base: "24px", lg: "52px" }}
            paddingX={{ base: "12px", lg: "32px" }}
            gap={{ base: "12px", lg: "24px" }}
          >
            <Box w={{ base: "full", lg: "1/4" }}>
              <Box
                bg="white"
                borderRadius="xl"
                padding={{ base: 4, lg: 6 }}
                boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
              >
                <Flex
                  direction={{ base: "row", lg: "row" }}
                  justify="space-between"
                  align="center"
                >
                  <Flex>
                    <Image
                      boxSize={{ base: "40px", lg: "60px" }}
                      borderRadius="full"
                      src={avatar}
                      alt="profile-image"
                    />
                    <Box marginLeft={3} alignSelf={"center"}>
                      <Text
                        fontSize={{ base: "12px", lg: "16px" }}
                        fontWeight="semibold"
                        color="black"
                        wordBreak="break-word"
                      >
                        {fullName}
                      </Text>
                      <Text
                        fontSize={{ base: "12px", lg: "14px" }}
                        fontWeight="regular"
                        color="gray.400"
                        wordBreak="break-word"
                      >
                        {email}
                      </Text>
                    </Box>
                  </Flex>

                  <Box display={{ base: "block", lg: "none" }}>
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Button
                          backgroundColor={"transparent"}
                          size="sm"
                          border={"none"}
                          _focusVisible={{ outline: "none", boxShadow: "none" }}
                        >
                          <ArrowDown2 color="black" />
                        </Button>
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
                              color="black"
                              _hover={{ bg: "gray.100" }}
                              onClick={() => navigate("/profile")}
                            >
                              Profil
                            </Menu.Item>
                            <Menu.Item
                              color="black"
                              _hover={{ bg: "gray.100" }}
                              onClick={() => navigate("/orders")}
                            >
                              Pesanan Saya
                            </Menu.Item>
                            <Menu.Item
                              color="black"
                              _hover={{ bg: "gray.100" }}
                              onClick={() => navigate("/change-password")}
                            >
                              Ubah Password
                            </Menu.Item>
                            <Menu.Item
                              color="red"
                              _hover={{ bg: "gray.100" }}
                              onClick={handleLogout}
                            >
                              Keluar
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </Box>
                </Flex>

                <Box
                  flex="1"
                  height="1px"
                  bg="gray.200"
                  marginTop={4}
                  display={{ base: "none", lg: "block" }}
                />
                <VStack
                  marginTop={4}
                  display={{ base: "none", lg: "block" }}
                  spaceY={2}
                >
                  <Button
                    size="sm"
                    width="full"
                    bg={activePage === "profil" ? "orange.500" : "white"}
                    color={activePage === "profil" ? "white" : "black"}
                    rounded="xl"
                    px={2}
                    py={5}
                    _hover={{
                      bg: activePage === "profil" ? "orange.600" : "gray.100",
                    }}
                    justifyContent="start"
                    onClick={() => navigate("/profile")}
                  >
                    <User
                      style={{ width: "24px", height: "24px" }}
                      color={activePage === "profil" ? "white" : "black"}
                    />
                    <Text
                      lineHeight="1"
                      whiteSpace="nowrap"
                      color={activePage === "profil" ? "white" : "black"}
                    >
                      Profil
                    </Text>
                  </Button>

                  <Button
                    size="sm"
                    width="full"
                    bg={activePage === "orders" ? "orange.500" : "white"}
                    color={activePage === "orders" ? "white" : "black"}
                    rounded="xl"
                    px={2}
                    py={5}
                    _hover={{
                      bg: activePage === "orders" ? "orange.600" : "gray.100",
                    }}
                    justifyContent="start"
                    onClick={() => navigate("/orders")}
                  >
                    <Box1
                      style={{ width: "24px", height: "24px" }}
                      color={activePage === "orders" ? "white" : "black"}
                    />
                    <Text
                      lineHeight="1"
                      whiteSpace="nowrap"
                      color={activePage === "orders" ? "white" : "black"}
                    >
                      Pesanan Saya
                    </Text>
                  </Button>

                  <Button
                    size="sm"
                    width="full"
                    bg={activePage === "ubah-password" ? "orange.500" : "white"}
                    color={activePage === "ubah-password" ? "white" : "black"}
                    rounded="xl"
                    px={2}
                    py={5}
                    _hover={{
                      bg:
                        activePage === "ubah-password"
                          ? "orange.600"
                          : "gray.100",
                    }}
                    justifyContent="start"
                    onClick={() => navigate("/change-password")}
                  >
                    <PasswordCheck
                      style={{ width: "24px", height: "24px" }}
                      color={activePage === "ubah-password" ? "white" : "black"}
                    />
                    <Text
                      lineHeight="1"
                      whiteSpace="nowrap"
                      color={activePage === "ubah-password" ? "white" : "black"}
                    >
                      Ubah Password
                    </Text>
                  </Button>

                  <Button
                    size="sm"
                    width="full"
                    bg={activePage === "keluar" ? "orange.500" : "white"}
                    color={activePage === "keluar" ? "white" : "red"}
                    rounded="xl"
                    px={2}
                    py={5}
                    _hover={{
                      bg: activePage === "keluar" ? "orange.600" : "gray.100",
                    }}
                    justifyContent="start"
                    onClick={handleLogout}
                  >
                    <Logout
                      style={{ width: "24px", height: "24px" }}
                      color={activePage === "keluar" ? "white" : "red"}
                    />
                    <Text
                      lineHeight="1"
                      whiteSpace="nowrap"
                      color={activePage === "keluar" ? "white" : "red"}
                    >
                      Keluar
                    </Text>
                  </Button>
                </VStack>
              </Box>
            </Box>

            {isLoading ? (
              <MyOrderSkeleton />
            ) : (
              <Box w={{ base: "full", lg: "3/4" }}>
                <Box
                  bg="white"
                  borderRadius="xl"
                  padding={{ base: 4, lg: 6 }}
                  boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
                  h="full"
                >
                  <Box display={{ base: "block", lg: "none" }}>
                    <Button
                      size={"sm"}
                      bg="transparent"
                      rounded={"xl"}
                      px={0}
                      py={0}
                      border={"none"}
                      fontWeight="semibold"
                    >
                      <ArrowLeft2
                        style={{ width: "24px", height: "24px" }}
                        color="black"
                      />
                      Pesanan Saya
                    </Button>
                  </Box>
                  <Text
                    textAlign={{ base: "start", lg: "start" }}
                    fontSize={{ base: "16px", lg: "20px" }}
                    fontWeight="bold"
                    color="black"
                    lineHeight={1}
                    display={{ base: "none", lg: "block" }}
                  >
                    Pesanan Saya
                  </Text>

                  <Box
                    overflowX="auto"
                    marginTop={{ base: "12px", lg: "24px" }}
                  >
                    <ButtonGroup spacing={0}>
                      {buttonLabels.map((label) => (
                        <FilterButton
                          key={label}
                          label={label}
                          isActive={label === activeFilter}
                          onClick={() => setActiveFilter(label)}
                        />
                      ))}
                    </ButtonGroup>
                  </Box>

                  <VStack marginTop="24px" gap={3}>
                    {filteredOrders.length === 0 ? (
                      <Box justifyItems={"center"} marginY="48px">
                        <Image
                          src={EmptyCartImg}
                          alt="empty"
                          maxW={{ base: "40%", lg: "200px" }}
                          objectFit="contain"
                        />
                        <Text
                          color="gray.500"
                          fontSize="sm"
                          textAlign={"center"}
                        >
                          Belum ada pesanan
                        </Text>
                      </Box>
                    ) : (
                      filteredOrders.map((order) => (
                        <CartOrder key={order.id} order={order} />
                      ))
                    )}
                  </VStack>
                </Box>
              </Box>
            )}
          </Flex>
        </Container>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
