import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Img404 from "../assets/404.png";

export default function NotFound() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      paddingX={{base:"6", lg:"36"}}
      bg="white"
      direction={{ base: "column", lg: "row" }}
      gap={10}
    >
      <Image
        src={Img404}
        alt="404 Not Found"
        maxW={{ base: "80%", lg: "500px" }}
        objectFit="contain"
      />

      <Box textAlign={{ base: "center", lg: "left" }}>
        <Text
          fontSize={{ base: "24px", lg: "32px" }}
          fontWeight="bold"
          color={"black"}
        >
          Oops, Halaman Tidak Ditemukan
        </Text>
        <Text fontSize={{ base: "14px", lg: "16px" }} mt={3} color="gray.600">
          Jangan Khawatir, kamu dapat kembali mengakses halaman lainnya melalui
          halaman beranda
        </Text>
        <Button
          as={Link}
          to="/"
          mt={6}
          bg="orange.500"
          color="white"
          _hover={{ bg: "orange.600" }}
          rounded="xl"
          px={6}
          py={5}
        >
          Kembali Ke Beranda
        </Button>
      </Box>
    </Flex>
  );
}
