import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { MedalStar, WalletMoney, Bag2, Map } from "iconsax-react";

export default function Benefit() {
  return (
    <Container
      p="40px"
      marginY={{ base: "16px", lg: "48px" }}
      paddingX={{ base: "16px", lg: "48px" }}
    >
      <Grid
        borderRadius={{ base: "16px", lg: "32px" }}
        paddingY={{ base: "36px", lg: "96px" }}
        paddingX={{ base: "0px", lg: "96px" }}
        gap={10}
        background="linear-gradient(to right, #D61C4E, #F77E21)"
      >
        {/* Headline */}
        <GridItem textAlign="center" paddingX="20px">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="white"
          >
            Keuntungan Belanja di Sawangan 1
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="white"
          >
            Nikmati pengalaman belanja yang mudah, aman, dan menguntungkan hanya
            di Sawangan 1
          </Text>
        </GridItem>

        {/* Kategori Box */}
        <GridItem>
          <Flex justify="center" gap={6} wrap="wrap">
            {/* Box Makanan */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderRadius="16px"
              w={{ base: "130px", lg: "200px" }}
              h={{ base: "130px", lg: "200px" }}
              bg="transparent"
              _hover={{ bg: "#F77E21" }}
              p={"4px"}
            >
              <MedalStar size="44px" color="white" variant="Bold" />
              <Text
                fontSize={{ base: "12px", lg: "20px" }}
                fontWeight="semibold"
                color="white"
                mt="8px"
                textAlign={"center"}
              >
                Berkualitas
              </Text>
              <Text
                fontSize={{ base: "8px", lg: "12px" }}
                fontWeight="regular"
                color="white"
                mt="8px"
                textAlign={"center"}
                w={"full"}
              >
                Kami hanya menyediakan produk asli dan terjamin kualitas dan
                rasanya
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderRadius="16px"
              w={{ base: "130px", lg: "200px" }}
              h={{ base: "130px", lg: "200px" }}
              cursor="pointer"
              bg="#transparent"
              _hover={{ bg: "#F77E21" }}
              p={"4px"}
            >
              <WalletMoney size="44" color="white" variant="Bold" />
              <Text
                fontSize={{ base: "12px", lg: "20px" }}
                fontWeight="semibold"
                color="white"
                mt="8px"
                textAlign={"center"}
              >
                Harga Terbaik
              </Text>
              <Text
                fontSize={{ base: "8px", lg: "12px" }}
                fontWeight="regular"
                color="white"
                mt="8px"
                textAlign={"center"}
                w={"full"}
              >
                Nikmati harga kompetitif dan lebih menguntungkan daripada toko
                lainnya
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderRadius="16px"
              w={{ base: "130px", lg: "200px" }}
              h={{ base: "130px", lg: "200px" }}
              cursor="pointer"
              bg="#transparent"
              _hover={{ bg: "#F77E21" }}
              p={"4px"}
            >
              <Bag2 size="44" color="white" variant="Bold" />
              <Text
                fontSize={{ base: "12px", lg: "20px" }}
                fontWeight="semibold"
                color="white"
                mt="8px"
                textAlign={"center"}
              >
                Beragam Pilihan
              </Text>
              <Text
                fontSize={{ base: "8px", lg: "12px" }}
                fontWeight="regular"
                color="white"
                mt="8px"
                textAlign={"center"}
                w={"full"}
              >
                Tersedia produk dengan banyak varian untuk memenuhi kebutuhanmu
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderRadius="16px"
              w={{ base: "130px", lg: "200px" }}
              h={{ base: "130px", lg: "200px" }}
              cursor="pointer"
              bg="#transparent"
              _hover={{ bg: "#F77E21" }}
              p={"4px"}
            >
              <Map size="44" color="white" variant="Bold" />
              <Text
                fontSize={{ base: "12px", lg: "20px" }}
                fontWeight="semibold"
                color="white"
                mt="8px"
                textAlign={"center"}
              >
                Beli Dimana Saja
              </Text>
              <Text
                fontSize={{ base: "8px", lg: "12px" }}
                fontWeight="regular"
                color="white"
                mt="8px"
                textAlign={"center"}
                w={"full"}
              >
                Belanja dari mana saja, kapan saja secara online yang mudah dan
                cepat.
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
