import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Navbar from "../components/navigation/Navbar";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import Footer from "../components/sections/Footer";
import CheckoutItem from "../components/card/CheckoutItem";
import { User } from "react-iconly";
import { PhoneCall, Signpost } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function Checkout() {
  const { state: selectedItems = [] } = useLocation();

  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }, [selectedItems]);

  return (
    <div
      className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <Container paddingX={{ base: "0px", lg: "80px" }}>
        <Text
          marginTop={{ base: "72px", lg: "89px" }}
          fontSize={{ base: "24px", lg: "32px" }}
          fontWeight="bold"
          color="black"
          paddingX={{ base: "16px", lg: "32px" }}
        >
          Checkout
        </Text>
        <Grid
          className="grid lg:grid-cols-2 sm:grid-rows-1"
          marginTop={{ base: "16px", lg: "24px" }}
          marginBottom={{ base: "24px", lg: "52px" }}
          paddingX={{ base: "12px", lg: "32px" }}
          gap={{ base: "12px", lg: "24px" }}
        >
          <GridItem colSpan={1} className="flex flex-col">
            <Box
              bg="white"
              borderRadius="xl"
              padding={6}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Text
                fontSize={{ base: "16px", lg: "20px" }}
                fontWeight="semibold"
                color="black"
                lineHeight={1}
              >
                Detail Pengiriman
              </Text>
              <VStack align="start" gap={4} w="full" marginTop={"24px"}>
                <InputWithLogo
                  id="nama-penerima"
                  label="Nama Penerima"
                  type="text"
                  icon={User}
                />
                <InputWithLogo
                  id="nama-penerima"
                  label="Nomor Telepon"
                  type="tel"
                  icon={PhoneCall}
                />
                <Textarea
                  id="alamat-lengkap"
                  placeholder="Alamat Penerima"
                  color="black"
                  fontSize={{ base: "12px", lg: "16px" }}
                  borderColor="gray.300"
                  height="96px"
                />
                <InputWithLogo
                  id="kode-pos"
                  label="Kode Pos"
                  type="tel"
                  icon={Signpost}
                />
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={1} position="sticky">
            <Box
              bg="white"
              borderRadius="xl"
              padding={6}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Text
                fontSize={{ base: "16px", lg: "20px" }}
                fontWeight="semibold"
                color="black"
                lineHeight={1}
              >
                Ringkasan Belanja
              </Text>
              <Box flex="1" height="1px" bg="gray.200" marginTop={"24px"} />
              <VStack w="full" marginTop="8px">
                {selectedItems.map((item) => (
                  <CheckoutItem
                    key={item.productId}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))}
              </VStack>
              <Flex justifyContent="space-between" marginTop={"24px"}>
                <Text
                  textAlign="start"
                  fontSize="14px"
                  fontWeight="semibold"
                  color="gray.400"
                  lineHeight={"1.2"}
                >
                  Subtotal
                </Text>
                <Text
                  textAlign="end"
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight="bold"
                  color="black"
                  lineHeight={"1.2"}
                >
                  Rp {subtotal.toLocaleString("id-ID")}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" marginTop={"12px"}>
                <Text
                  textAlign="start"
                  fontSize="14px"
                  fontWeight="semibold"
                  color="gray.400"
                  lineHeight={"1.2"}
                >
                  Pengiriman
                </Text>
                <Text
                  textAlign="end"
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight="bold"
                  color="black"
                  lineHeight={"1.2"}
                >
                  Rp 450.000
                </Text>
              </Flex>
              <Box flex="1" height="1px" bg="gray.200" marginTop={"24px"} />
              <Flex justifyContent="space-between" marginTop={"24px"}>
                <Text
                  textAlign="start"
                  fontSize="14px"
                  fontWeight="semibold"
                  color="gray.400"
                  lineHeight={"1.2"}
                >
                  Total Tagihan
                </Text>
                <Text
                  textAlign="end"
                  fontSize={{ base: "16px", lg: "20px" }}
                  fontWeight="bold"
                  color="orange.500"
                  lineHeight={"1.2"}
                >
                  Rp 450.000
                </Text>
              </Flex>
              <Button
                marginTop={"24px"}
                size={"sm"}
                bg={"orange.500"}
                color={"white"}
                rounded={"xl"}
                w={"full"}
                py={5}
                _hover={{ bg: "orange.600" }}
              >
                <Text lineHeight="1" whiteSpace="nowrap">
                  Buat Pesanan
                </Text>
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Footer display={{ base: "none", lg: "block" }} />
    </div>
  );
}
