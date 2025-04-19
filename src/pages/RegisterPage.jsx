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
import { Link as RouterLink } from "react-router-dom"; 
import Logo from "../assets/logo-sawangan.svg";

export default function RegisterPage() {
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
          <VStack align="start" spacing={3} w="full">
            <InputWithLogo
              id="username"
              label="Masukkan Nama Lengkap Anda"
              type="text"
              icon={User}
            />
            <InputWithLogo
              id="email"
              label="Masukkan Alamat Email Anda"
              type="email"
              icon={Message}
            />
            <InputWithLogo
              id="telephone"
              label="Masukkan Nomor Telepon Anda"
              type="tel"
              icon={PhoneCall}
            />
            <InputWithLogo
              id="password"
              label="Masukkan Password"
              type="password"
              icon={Lock}
            />
            <InputWithLogo
              id="confirm-password"
              label="Konfirmasi Password"
              type="password"
              icon={Lock}
            />
          </VStack>
          <Checkbox.Root colorPalette="orange" variant="solid">
            <Checkbox.HiddenInput />
            <Checkbox.Control color="white" />
            <Checkbox.Label color="gray.500" fontWeight="light">
              Saya menyetujui syarat dan ketentuan dan kebijakan privasi yang
              berlaku
            </Checkbox.Label>
          </Checkbox.Root>
          <Button
            size={"sm"}
            bg={"orange.500"}
            color={"white"}
            rounded={"xl"}
            w={"full"}
            py={5}
            _hover={{ bg: "orange.600" }}
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
          <Button
            size={"sm"}
            bg={"gray.200"}
            color={"gray.700"}
            rounded={"xl"}
            w={"full"}
            py={5}
            _hover={{ bg: "gray.300" }}
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              boxSize="20px"
            />
            <Text lineHeight="1" whiteSpace="nowrap">
              Daftar menggunakan Google
            </Text>
          </Button>
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
            <Link as={RouterLink} to="/masuk" color="orange.500" fontWeight="semibold">
              Masuk
            </Link>
          </Text>
        </GridItem>
      </Grid>
    </div>
  );
}
