import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputWithLogo } from "../../components/inputs/InputWithLogo";
import Banner from "../../assets/login-bg.png";
import Logo from "../../assets/logo-sawangan.svg";
import { Message, Lock } from "react-iconly";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/store";
import { toaster } from "../../components/ui/toaster";

export default function LoginAdmin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(formData).unwrap();
      localStorage.setItem("token", response.data.token);
      console.log("Token:", response.data.token);

      toaster.success({
        title: "Login Berhasil",
      });

      navigate("/dashboard");
    } catch (err) {
      toaster.error({
        title: "Login Gagal",
        description: err?.data?.errors || "Email atau password salah.",
      });
    }
  };

  return (
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
        <Image
          src={Logo}
          alt="logo-img"
          display={{ base: "block", lg: "none" }}
          w="1/2"
          marginBottom="20px"
        />

        <Text
          textAlign={{ base: "center", md: "start", lg: "start" }}
          fontSize={{ base: "24px", lg: "32px" }}
          fontWeight="bold"
          color="black"
        >
          Login Admin
        </Text>
        <Text
          textAlign={{ base: "center", md: "start", lg: "start" }}
          fontSize={{ base: "12px", lg: "16px" }}
          color="gray.400"
          marginBottom="8px"
        >
          Masukkan email dan password untuk mengakses dashboard admin dan kelola
          sistem dengan aman.
        </Text>

        <VStack align="start" gap={4} w="full">
          <InputWithLogo
            id="email"
            label="Alamat Email"
            type="email"
            icon={Message}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <InputWithLogo
            id="password"
            label="Password"
            type="password"
            icon={Lock}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </VStack>

        <Button
          size="sm"
          bg="orange.500"
          color="white"
          rounded="xl"
          w="full"
          py={5}
          _hover={{ bg: "orange.600" }}
          isLoading={isLoading}
          onClick={handleLogin}
        >
          <Text lineHeight="1" whiteSpace="nowrap">
            Masuk
          </Text>
        </Button>
      </GridItem>
    </Grid>
  );
}
