import {
  Button,
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import Banner from "../assets/login-bg.png";
import { Message, Lock } from "react-iconly";
import Logo from "../assets/logo-sawangan.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import { useLoginMutation } from "../store/store";
import LoginWithGoogle from "../components/auth/LoginWithGoogle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    const toastId = toaster.loading({
      title: "Sedang masuk...",
      duration: 4000,
    });
    try {
      const response = await login({ email, password }).unwrap();

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.warn("Token tidak ditemukan:", response);
      }

      toaster.success({
        title: "Login Berhasil",
      });

      navigate("/");
    } catch (err) {
      toaster.error({
        title: "Login Gagal",
        description: err?.data?.errors || "Email atau password salah.",
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
            <Image
              display={{ base: "block", lg: "none" }}
              src={Logo}
              alt="logo-img"
              w="1/2"
              objectFit="cover"
              marginBottom="40px"
              marginTop="20px"
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
              Selamat Datang Kembali
            </Text>
            <Text
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight={"regular"}
              color="gray.400"
              marginY={"12px"}
            >
              Masuk untuk melanjutkan pengalaman belanja oleh-oleh khas
              Purwokerto yang mudah dan cepat
            </Text>
          </Flex>

          <VStack align="start" gap={3} w="full">
            <InputWithLogo
              id="email"
              label="Masukkan Alamat Email Anda"
              type="email"
              icon={Message}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputWithLogo
              id="password"
              label="Masukkan Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              as={RouterLink}
              to="/forgot-password"
              width="full"
              justifyContent="end"
              fontWeight="semibold"
              color="orange.500"
            >
              Lupa Password?
            </Link>
          </VStack>

          <Button
            size={"sm"}
            bg={"orange.500"}
            color={"white"}
            rounded={"xl"}
            w={"full"}
            py={5}
            _hover={{ bg: "orange.600" }}
            onClick={handleLogin}
            isLoading={isLoading}
          >
            <Text lineHeight="1" whiteSpace="nowrap">
              Masuk
            </Text>
          </Button>

          <Flex width="full" align="center" gap={2}>
            <Box flex="1" height="1px" bg="gray.300"></Box>
            <Text
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight="light"
              color="gray.400"
            >
              Atau masuk menggunakan
            </Text>
            <Box flex="1" height="1px" bg="gray.300"></Box>
          </Flex>

          <Flex w="full" alignSelf={"center"} >
            <LoginWithGoogle
              text="signin_with"
              onSuccessLogin={() => navigate("/")}
            />
          </Flex>

          <Text
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="light"
            color="gray.400"
            marginTop={{ base: "40px", lg: "0px" }}
            marginBottom={{ base: "20px", lg: "0px" }}
            textAlign="center"
            width="full"
          >
            Belum punya akun?{" "}
            <Link
              as={RouterLink}
              to="/register"
              color="orange.500"
              fontWeight="semibold"
            >
              Daftar
            </Link>
          </Text>
        </GridItem>
      </Grid>
      <Toaster />
    </div>
  );
}
