import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Image from "../../assets/about-img.png";

export default function About1() {
  return (
    <Container
      paddingX={{ base: "20px", lg: "72px" }}
      paddingY={{ base: "20px", lg: "100px" }}
      marginTop={"96px"}
      bg="gray.100"
      borderRadius={{ sm: "16px", lg: "32px" }}
    >
      <Grid
        className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 justify-start gap-8"
        marginX={{ base: "24px", lg: "0" }}
      >
        <GridItem
          className="col-span-1"
          w="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src={Image} alt="about-img" className="w-[450px]" />
        </GridItem>
        <GridItem className="col-span-1 flex flex-col gap-2" w="full">
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={"40px"}
            fontWeight="bold"
            color="black"
            marginY={"12px"}
            lineHeight={"1.2"}
          >
            Kenali Sawangan 1,{" "}
            <Text as="span" color="#D61C4E">
              Rumahnya Oleh-oleh Purwokerto
            </Text>
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={"16px"}
            fontWeight={"regular"}
            color="black"
            marginY={"12px"}
          >
            Sawangan 1 adalah pusat oleh-oleh khas Purwokerto yang telah
            melayani pelanggan sejak 1991. Berlokasi di Jl. Mayjend Sutoyo No.
            39, Purwokerto, kami menawarkan berbagai makanan khas Banyumas
            seperti tempe keripik, mendoan, gethuk goreng, dan nopia dengan
            kualitas terbaik. Dengan komitmen menghadirkan produk autentik dan
            lezat, kami ingin memudahkan Anda mendapatkan oleh-oleh khas tanpa
            harus repot. Kunjungi toko kami atau pesan secara online, dan
            nikmati kelezatan khas Banyumas di mana pun Anda berada! rumahmu!
          </Text>
          <Flex
            paddingTop={4}
            gap={4}
            display="flex"
            justifyContent={{
              base: "center",
              md: "flex-start",
              lg: "flex-start",
            }}
            alignItems="center"
          >
            <Button
              size={"sm"}
              bg={"orange.500"}
              color={"white"}
              rounded={"full"}
              px={5}
              py={4}
              _hover={{ bg: "orange.700" }}
            >
              <Text lineHeight="1" whiteSpace="nowrap">
                Belanja Sekarang
              </Text>
            </Button>
            <Button
              size={"sm"}
              bg={"transparent"}
              color={"orange.500"}
              borderColor={"orange.500"}
              rounded={"full"}
              px={5}
              py={4}
              _hover={{ bg: "orange.500", color: "white" }}
            >
              <Text lineHeight="1" whiteSpace="nowrap">
                Kunjungi Toko
              </Text>
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
