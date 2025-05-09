import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EmptyIMG from "../../assets/empty-cart.png"
import Navbar from "../navigation/Navbar";
import Footer from "../sections/Footer";

export default function EmptyCart() {
  return (
    <>
      <Navbar />
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        paddingX={{ base: "12", lg: "40" }}
        bg="white"
        direction={{ base: "column", lg: "row" }}
        gap={{base:0, lg:24}}
      >
        <Image
          src={EmptyIMG}
          alt="401 Unauthorized"
          maxW={{ base: "80%", lg: "500px" }}
          objectFit="contain"
        />

        <Box textAlign={{ base: "center", lg: "left" }}>
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color={"black"}
          >
            Oops… Keranjangmu Sepi
          </Text>
          <Text fontSize={{ base: "14px", lg: "16px" }} mt={3} color="gray.600">
            Ayo kembali ke toko dan pilih oleh‑oleh terbaik: Tempe mendoan
            muantepp, kerupuk gurih, dan suvenir lokal Banyumas yang sayang
            untuk dilewatkan!
          </Text>
          <Button
            as={Link}
            to="/products"
            mt={6}
            bg="orange.500"
            color="white"
            _hover={{ bg: "orange.600" }}
            rounded="xl"
            px={6}
            py={5}
          >
            Belanja Sekarang
          </Button>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}
