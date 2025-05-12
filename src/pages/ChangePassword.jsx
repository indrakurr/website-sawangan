import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowLeft2,
  ArrowDown2,
  PasswordCheck,
  Logout,
  Box1,
} from "iconsax-react";
import Navbar from "../components/navigation/Navbar";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import { User, Lock } from "react-iconly";
import Footer from "../components/sections/Footer";
import { Toaster, toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useChangePasswordMutation,
  useLogoutMutation,
} from "../store/store";

export default function ChangePassword() {
  const [activePage] = useState("ubah-password");
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data } = useGetProfileQuery();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const fullName = data?.data?.fullName || "Pengguna";
  const email = data?.data?.email || "-";
  const provider = data?.data?.provider || "LOCAL";
  const isGoogleUser = provider === "GOOGLE";

  const avatar =
    data?.data?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`;

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toaster.error({ title: "Semua field harus diisi" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toaster.error({ title: "Password baru dan konfirmasi tidak cocok" });
      return;
    }

    const toastId = toaster.loading({
      title: "Menyimpan perubahan...",
      duration: 4000,
    });
    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      toaster.success({ title: "Password berhasil diubah" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toaster.error({
        title: "Gagal ubah password",
        description: err?.data?.errors || "Terjadi kesalahan.",
      });
    } finally {
      toaster.dismiss(toastId);
    }
  };

  const handleLogout = async () => {
    const toastId = toaster.loading({
          title: "Sedang Keluar...",
          duration: 4000,
        });
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      toaster.success({ title: "Berhasil logout" });
      navigate("/");
    } catch (err) {
      toaster.error({
        title: "Gagal logout",
        description: err?.data?.errors || "Terjadi kesalahan saat logout",
      });
    } finally {
      toaster.dismiss(toastId);
    }
  };

  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
      <Navbar />
      <Container paddingX={{ base: "0px", lg: "80px" }}>
        <Grid
          className="grid lg:grid-cols-4 sm:grid-rows-1"
          marginTop={{ base: "72px", lg: "89px" }}
          marginBottom={{ base: "24px", lg: "52px" }}
          paddingX={{ base: "12px", lg: "32px" }}
          gap={{ base: "12px", lg: "24px" }}
        >
          <GridItem colSpan={{ base: 3, lg: 1 }}>
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
                {/* Button group for larger screens */}
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
          </GridItem>
          <GridItem colSpan={3} className="flex flex-col">
            <Box
              bg="white"
              borderRadius="xl"
              padding={{ base: 4, lg: 6 }}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
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
                  Ubah Password
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
                Ubah Password
              </Text>
              <Text
                textAlign={{ base: "start", lg: "start" }}
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight={"regular"}
                color="gray.400"
                marginY={"12px"}
                display={{ base: "none", lg: "block" }}
              >
                Kelola informasi profil Anda untuk mengontrol, melindungi dan
                mengamankan akun
              </Text>
              <Grid className="grid lg:grid-cols-3 sm:grid-rows-1">
                <GridItem colSpan={2}>
                  <VStack paddingY={6} gap={4}>
                    <InputWithLogo
                      id="current-password"
                      label="Masukkan Password Saat Ini"
                      type="password"
                      icon={Lock}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      isDisabled={isGoogleUser}
                    />
                    <InputWithLogo
                      id="new-password"
                      label="Masukkan Password Baru"
                      type="password"
                      icon={Lock}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      isDisabled={isGoogleUser}
                    />
                    <InputWithLogo
                      id="confirm-password"
                      label="Konfirmasi Password Baru"
                      type="password"
                      icon={Lock}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isDisabled={isGoogleUser}
                    />
                    <Button
                      size="sm"
                      bg="orange.500"
                      color="white"
                      rounded="xl"
                      px={5}
                      py={5}
                      _hover={{ bg: "orange.600" }}
                      alignSelf={{ base: "center", lg: "start" }}
                      onClick={handleChangePassword}
                      isLoading={isLoading}
                      isDisabled={isGoogleUser}
                    >
                      Simpan Perubahan
                    </Button>
                    {isGoogleUser && (
                      <Text
                        fontSize="12px"
                        color="gray.500"
                        alignSelf={{ base: "center", lg: "start" }}
                      >
                        *Anda login menggunakan Google, tidak dapat mengubah
                        password di sini.
                      </Text>
                    )}
                  </VStack>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
      <Toaster />
    </div>
  );
}
