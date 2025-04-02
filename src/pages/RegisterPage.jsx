import { Button, Checkbox, Grid, GridItem, Image, Text, VStack } from "@chakra-ui/react";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import Banner from "../assets/login-bg.png";
import { Message, User, Lock } from "react-iconly";
import { PhoneCall } from "@phosphor-icons/react";

export default function RegisterPage() {
  return (
    <div>
      <Grid h="100vh" templateColumns="1fr 1fr" padding={5}>
        <GridItem>
          <Image
            src={Banner}
            alt="about-img"
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
          paddingX="120px"
          gap={4}
        >
          <div>
            <Text
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={"32px"}
              fontWeight="bold"
              color="black"
              marginY={"12px"}
              lineHeight={"1"}
            >
              Bergabunglah dengan Kami
            </Text>
            <Text
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={"16px"}
              fontWeight={"regular"}
              color="gray.400"
              marginY={"12px"}
            >
              Daftarkan akun Anda untuk menikmati kemudahan belanja oleh-oleh
              khas Purwokerto secara online
            </Text>
          </div>
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
        </GridItem>
      </Grid>
    </div>
  );
}
