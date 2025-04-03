import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  PinInput,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import Banner from "../assets/login-bg.png";
import { Message } from "react-iconly";
import Logo from "../assets/logo-sawangan.svg";
import { ArrowLeft2 } from "iconsax-react";

export default function Verification() {
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
                _hover={{ bg: "orange.600" }}
                border={"none"}
                display={{ base: "none", lg: "flex" }}
                marginBottom="24px"
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
              Masukkan Kode Verifikasi
            </Text>
            <Text
              textAlign={{ base: "center", md: "start", lg: "start" }}
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight={"regular"}
              color="gray.400"
              marginY={"12px"}
            >
              Kode verifikasi telah dikirimkan ke email Anda. Silakan masukkan
              kode verifikasi di bawah untuk melanjutkan proses reset password
            </Text>
          </Flex>
          <VStack align="center" gap={3} w="full">
            <PinInput.Root otp>
              <PinInput.HiddenInput />
              <PinInput.Control>
                <PinInput.Input index={0} color={"black"} />
                <PinInput.Input index={1} color={"black"} />
                <PinInput.Input index={2} color={"black"} />
                <PinInput.Input index={3} color={"black"}/>
              </PinInput.Control>
            </PinInput.Root>
          </VStack>
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
              Lanjutkan
            </Text>
          </Button>
        </GridItem>
      </Grid>
    </div>
  );
}
