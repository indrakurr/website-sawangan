import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import Banner from "../assets/login-bg.png";
import { Lock } from "react-iconly";
import Logo from "../assets/logo-sawangan.svg";
import { ArrowLeft2 } from "iconsax-react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../store/store";
import { toaster, Toaster } from "../components/ui/toaster";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const token = searchParams.get("token");

  const handleReset = async () => {
    if (!token) {
      return toaster.error({
        title: "Token tidak ditemukan",
      });
    }

    if (password !== confirmPassword) {
      return toaster.error({
        title: "Password tidak sama",
      });
    }
    const toastId = toaster.loading({
      title: "Menyimpan perubahan...",
      duration: 4000,
    });
    try {
      await resetPassword({ token, password, confirmPassword }).unwrap();

      toaster.success({
        title: "Password berhasil diubah",
      });

      navigate("/login");
    } catch (err) {
      toaster.error({
        title: "Gagal mengubah password",
        description: err?.data?.errors || "Terjadi kesalahan",
      });
    } finally {
      toaster.dismiss(toastId);
    }
  };

  return (
    <div>
      <Grid
        h="100vh"
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        padding={5}
      >
        <GridItem display={{ base: "none", lg: "block" }}>
          <Image
            src={Banner}
            alt="banner-img"
            w="full"
            h="full"
            objectFit="cover"
            borderRadius="32px"
          />
        </GridItem>
        <GridItem
          className="flex flex-col"
          alignItems={{ base: "center", lg: "start" }}
          justifyContent="center"
          paddingX={{ base: "20px", lg: "120px" }}
          gap={4}
        >
          <Flex direction="column" alignItems="center">
            <Flex
              w="full"
              justifyContent="start"
              position="absolute"
              top={5}
              left={5}
              display={{ base: "flex", lg: "none" }}
            >
              <Button
                size={"sm"}
                bg="transparent"
                rounded={"xl"}
                px={0}
                py={0}
                _hover={{ bg: "orange.600" }}
                border={"none"}
                onClick={() => navigate(-1)}
              >
                <ArrowLeft2
                  style={{ width: "24px", height: "24px" }}
                  color="black"
                />
                Kembali
              </Button>
            </Flex>
            <Flex width="full" alignItems="start">
              <Button
                size={"sm"}
                bg="transparent"
                rounded={"xl"}
                px={0}
                py={0}
                border={"none"}
                display={{ base: "none", lg: "flex" }}
                marginBottom="24px"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft2
                  style={{ width: "24px", height: "24px" }}
                  color="black"
                />
                Kembali
              </Button>
            </Flex>
            <Image
              display={{ base: "block", lg: "none" }}
              src={Logo}
              alt="logo-img"
              w="1/2"
              objectFit="cover"
              marginBottom="40px"
            />
            <Text
              w="full"
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={{ base: "24px", lg: "32px" }}
              fontWeight="bold"
              color="black"
              marginY={"12px"}
              lineHeight={"1"}
            >
              Buat Password Baru
            </Text>
            <Text
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight={"regular"}
              color="gray.400"
              marginY={"12px"}
            >
              Buat password baru untuk akun Anda. Pastikan password yang Anda
              buat kuat dan mudah diingat
            </Text>
          </Flex>

          <VStack align="start" gap={3} w="full">
            <InputWithLogo
              id="new-password"
              label="Masukkan Password Baru"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputWithLogo
              id="confirm-new-password"
              label="Konfirmasi Password Baru"
              type="password"
              icon={Lock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </VStack>

          <Button
            size={"sm"}
            bg={"orange.500"}
            color={"white"}
            rounded={"xl"}
            w={"full"}
            py={5}
            _hover={{ bg: "orange.600" }}
            onClick={handleReset}
            isLoading={isLoading}
          >
            <Text lineHeight="1" whiteSpace="nowrap">
              Ubah Password
            </Text>
          </Button>
        </GridItem>
      </Grid>
      <Toaster />
    </div>
  );
}
