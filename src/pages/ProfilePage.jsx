import { useEffect, useState } from "react";
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
import { ArrowLeft2 } from "iconsax-react";
import Navbar from "../components/navigation/Navbar";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import { Message, User } from "react-iconly";
import { PhoneCall } from "@phosphor-icons/react";
import { PasswordCheck, Logout, Category2, ArrowDown2, Box1 } from "iconsax-react";
import { Toaster, toaster } from "../components/ui/toaster";
import Footer from "../components/sections/Footer";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useLogoutMutation,
} from "../store/store";

export default function ProfilePage() {
  const { data, isLoading, error, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const [activePage] = useState("profil");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (data?.data) {
      setFullName(data.data.fullName || "");
      setEmail(data.data.email || "");
      setPhone(data.data.phone || "");
      setAvatar(data.data.avatar);
    }
  }, [data]);

  const avatarUrl =
    avatar ||
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName);

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await uploadAvatar(formData).unwrap();
      toaster.success({ title: "Foto profil berhasil diperbarui" });
      refetch();
    } catch (err) {
      toaster.error({
        title: "Gagal upload foto",
        description: err?.data?.errors || "Terjadi kesalahan",
      });
    }
  };

  const handleLogout = async () => {
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
                    src={avatarUrl}
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
                  size="sm"
                  bg="transparent"
                  rounded="xl"
                  px={0}
                  py={0}
                  border="none"
                  fontWeight="semibold"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft2
                    style={{ width: "24px", height: "24px" }}
                    color="black"
                  />
                  Profil Saya
                </Button>
              </Box>
              <Text
                textAlign="start"
                fontSize={{ base: "16px", lg: "20px" }}
                fontWeight="bold"
                color="black"
                display={{ base: "none", lg: "block" }}
              >
                Profil Saya
              </Text>
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                color="gray.400"
                marginY="12px"
                display={{ base: "none", lg: "block" }}
              >
                Kelola informasi profil Anda untuk mengontrol, melindungi dan
                mengamankan akun
              </Text>
              <Grid className="grid lg:grid-cols-3 sm:grid-rows-1">
                <GridItem colSpan={1}>
                  <VStack padding={6} gap={{ base: "0px", lg: "16px" }}>
                    <Image
                      boxSize={{ base: "100px", lg: "160px" }}
                      borderRadius="full"
                      src={avatarUrl}
                      alt="profile-image"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar"
                      hidden
                      onChange={handleUploadAvatar}
                    />
                    <label htmlFor="avatar">
                      <Button
                        size="sm"
                        bg="transparent"
                        color="orange.500"
                        borderRadius="xl"
                        px={5}
                        py={4}
                        isLoading={isUploading}
                        cursor="pointer"
                        as="span"
                      >
                        <Text lineHeight="1" whiteSpace="nowrap">
                          Ubah Foto Profil
                        </Text>
                      </Button>
                    </label>
                    <Text
                      fontSize="12px"
                      color="gray.400"
                      textAlign="center"
                      paddingX={{ base: "16px", lg: "0px" }}
                    >
                      Ukuran gambar: maks. 1 MB. Format gambar: .JPG .JPEG .PNG
                    </Text>
                  </VStack>
                </GridItem>
                <GridItem colSpan={2}>
                  <VStack paddingY={6} paddingX={3} gap={4}>
                    <InputWithLogo
                      id="username"
                      label="Nama Lengkap"
                      type="text"
                      icon={User}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <InputWithLogo
                      id="email"
                      label="Alamat Email"
                      type="email"
                      icon={Message}
                      value={email}
                      isReadOnly
                    />
                    <InputWithLogo
                      id="telephone"
                      label="Nomor Telepon"
                      type="tel"
                      icon={PhoneCall}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      isLoading={isUpdating}
                      onClick={async () => {
                        try {
                          await updateProfile({ fullName, phone }).unwrap();
                          toaster.success({
                            title: "Profil berhasil diperbarui",
                          });
                          refetch();
                        } catch (err) {
                          toaster.error({
                            title: "Gagal memperbarui profil",
                            description:
                              err?.data?.errors || "Terjadi kesalahan",
                          });
                        }
                      }}
                    >
                      <Text lineHeight="1" whiteSpace="nowrap">
                        Simpan Perubahan
                      </Text>
                    </Button>
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
