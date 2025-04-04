import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/sections/Footer";
import CartItem from "../components/card/CartItem";

export default function Cart() {
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
          Keranjang
        </Text>
        <Grid
          className="grid lg:grid-cols-3 sm:grid-rows-1"
          marginTop={{ base: "16px", lg: "24px" }}
          marginBottom={{ base: "160px", lg: "52px" }}
          paddingX={{ base: "12px", lg: "32px" }}
        >
          <GridItem
            colSpan={2}
            className="flex flex-col"
            gap={{ base: "8px", lg: "12px" }}
          >
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </GridItem>
          <GridItem
            colSpan={1}
            display={{ base: "none", lg: "block" }}
            position="sticky"
          >
            <Box
              bg="white"
              borderRadius="xl"
              padding={4}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Text
                textAlign="start"
                fontSize="16px"
                fontWeight="bold"
                color="black"
                lineHeight={"1.2"}
              >
                Ringkasan Belanja
              </Text>
              <Flex justifyContent="space-between" marginTop={"16px"}>
                <Text
                  textAlign="start"
                  fontSize="14px"
                  fontWeight="regular"
                  color="gray.400"
                  lineHeight={"1.2"}
                >
                  Total
                </Text>
                <Text
                  textAlign="end"
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight="bold"
                  color="orange.500"
                  lineHeight={"1.2"}
                >
                  Rp 450.000
                </Text>
              </Flex>
              <Box flex="1" height="1px" bg="gray.200" marginTop={"16px"} />
              <Button
                marginTop={"16px"}
                size={"sm"}
                bg={"orange.500"}
                color={"white"}
                rounded={"xl"}
                w={"full"}
                py={5}
                _hover={{ bg: "orange.600" }}
              >
                <Text lineHeight="1" whiteSpace="nowrap">
                  Beli
                </Text>
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Footer display={{ base: "none", lg: "block" }} />
      <Box
        display={{ base: "block", lg: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        bg="white"
        borderTop="1px solid #E2E8F0"
        padding={4}
        zIndex="10"
        boxShadow="0px -4px 30px rgba(0, 0, 0, 0.05)"
      >
        <Text
          textAlign="start"
          fontSize="16px"
          fontWeight="bold"
          color="black"
          lineHeight={"1.2"}
        >
          Ringkasan Belanja
        </Text>
        <Flex justifyContent="space-between" marginTop={"16px"}>
          <Text
            textAlign="start"
            fontSize="14px"
            fontWeight="regular"
            color="gray.400"
            lineHeight={"1.2"}
          >
            Total
          </Text>
          <Text
            textAlign="end"
            fontSize="16px"
            fontWeight="bold"
            color="orange.500"
            lineHeight={"1.2"}
          >
            Rp 450.000
          </Text>
        </Flex>
        <Button
          marginTop={"16px"}
          size={"sm"}
          bg={"orange.500"}
          color={"white"}
          rounded={"xl"}
          w={"full"}
          py={5}
          _hover={{ bg: "orange.600" }}
        >
          <Text lineHeight="1" whiteSpace="nowrap">
            Beli
          </Text>
        </Button>
      </Box>
    </div>
  );
}
