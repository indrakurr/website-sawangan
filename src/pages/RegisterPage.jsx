import {
  Button,
  Box,
  Checkbox,
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
import { Message, User, Lock } from "react-iconly";
import { PhoneCall } from "@phosphor-icons/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-sawangan.svg";
import { useState } from "react";
import { toaster, Toaster } from "../components/ui/toaster";
import LoginWithGoogle from "../components/auth/LoginWithGoogle";


import { useRegisterMutation } from "../store/store"; 

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      return toaster.error({
        title: "Gagal Daftar",
        description: "Password dan Konfirmasi Password tidak sama",
      });

    }

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      await register(payload).unwrap();

      toaster.success({
        title: "Pendaftaran Berhasil",
        description: "Silakan login untuk mulai belanja!",
      });


      navigate("/login");
    } catch (err) {
      toaster.error({
        title: "Pendaftaran Gagal",
        description: err?.data?.errors || "Terjadi kesalahan saat mendaftar",
      });

    }
  };

  return (
    <>
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
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={{ base: "24px", lg: "32px" }}
              fontWeight="bold"
              color="black"
              marginY={"12px"}
              lineHeight={"1"}
            >
              Bergabunglah dengan Kami
            </Text>
            <Text
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight={"regular"}
              color="gray.400"
              marginY={"12px"}
            >
              Daftarkan akun Anda untuk menikmati kemudahan belanja oleh-oleh
              khas Purwokerto secara online
            </Text>
          </Flex>

          <VStack align="start" gap={3} w="full">
            <InputWithLogo
              id="fullName"
              label="Masukkan Nama Lengkap Anda"
              type="text"
              icon={User}
              value={formData.fullName}
              onChange={handleChange}
            />
            <InputWithLogo
              id="email"
              label="Masukkan Alamat Email Anda"
              type="email"
              icon={Message}
              value={formData.email}
              onChange={handleChange}
            />
            <InputWithLogo
              id="phone"
              label="Masukkan Nomor Telepon Anda"
              type="tel"
              icon={PhoneCall}
              value={formData.phone}
              onChange={handleChange}
            />
            <InputWithLogo
              id="password"
              label="Masukkan Password"
              type="password"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
            />
            <InputWithLogo
              id="confirmPassword"
              label="Konfirmasi Password"
              type="password"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </VStack>

          <Checkbox.Root
            colorPalette="orange"
            variant="solid"
            onCheckedChange={(checked) => setAgree(!!checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control color="white" />
            <Checkbox.Label color="gray.500" fontWeight="light">
              Saya menyetujui syarat dan ketentuan dan kebijakan privasi yang
              berlaku
            </Checkbox.Label>
          </Checkbox.Root>

          <Button
            isDisabled={!agree}
            size={"sm"}
            bg={"orange.500"}
            color={"white"}
            rounded={"xl"}
            w={"full"}
            py={5}
            _hover={{ bg: "orange.600" }}
            onClick={handleRegister}
            isLoading={isLoading}
          >
            <Text lineHeight="1" whiteSpace="nowrap">
              Daftar
            </Text>
          </Button>

          <Flex width="full" align="center" gap={2}>
            <Box flex="1" height="1px" bg="gray.300"></Box>
            <Text
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight="light"
              color="gray.400"
            >
              Atau daftar menggunakan
            </Text>
            <Box flex="1" height="1px" bg="gray.300"></Box>
          </Flex>

          <LoginWithGoogle
            text="signup_with"
            onSuccessLogin={() => navigate("/")}
          />

          <Text
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="light"
            color="gray.400"
            marginTop={{ base: "40px", lg: "0px" }}
            marginBottom={{ base: "20px", lg: "0px" }}
            textAlign="center"
            width="full"
          >
            Sudah punya akun?{" "}
            <Link
              as={RouterLink}
              to="/login"
              color="orange.500"
              fontWeight="semibold"
            >
              Masuk
            </Link>
          </Text>
        </GridItem>
      </Grid>
      <Toaster />
    </>
  );
}
