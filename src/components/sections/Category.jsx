import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import Drink from "../../assets/drinks-line.svg";
import Food from "../../assets/restaurant-line.svg";
import Accessories from "../../assets/handbag-line.svg";

export default function Category() {
  return (
    <Container marginBottom={"96px"}>
      <Grid gap={10}>
        {/* Headline */}
        <GridItem textAlign="center">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Jelajahi Kategori
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
          >
            Temukan berbagai kategori oleh-oleh khas Purwokerto yang tersedia
            untukmu
          </Text>
        </GridItem>

        {/* Kategori Box */}
        <GridItem>
          <Flex justify="center" gap={6} direction={"row"}>
            {/* Box Makanan */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={{ base: "16px", lg: "24px" }}
              borderRadius="20px"
              w={{ base: "100px", lg: "160px" }}
              h={{ base: "100px", lg: "160px" }}
              cursor="pointer"
              bg="#FDE5D3"
              _hover={{ bg: "#FCCBA6" }}
            >
              <Image src={Food} boxSize={{ base: "32px", lg: "48px" }} />
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight="semibold"
                color="black"
                mt="8px"
              >
                Makanan
              </Text>
            </Box>

            {/* Box Minuman */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={{ base: "16px", lg: "24px" }}
              borderRadius="20px"
              w={{ base: "100px", lg: "160px" }}
              h={{ base: "100px", lg: "160px" }}
              cursor="pointer"
              bg="#FDE5D3"
              _hover={{ bg: "#FCCBA6" }}
            >
              <Image src={Drink} boxSize={{ base: "32px", lg: "48px" }} />
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight="semibold"
                color="black"
                mt="8px"
              >
                Minuman
              </Text>
            </Box>

            {/* Box Aksesoris */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={{ base: "16px", lg: "24px" }}
              borderRadius="20px"
              w={{ base: "100px", lg: "160px" }}
              h={{ base: "100px", lg: "160px" }}
              cursor="pointer"
              bg="#FDE5D3"
              _hover={{ bg: "#FCCBA6" }}
            >
              <Image src={Accessories} boxSize={{ base: "32px", lg: "48px" }} />
              <Text
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight="semibold"
                color="black"
                mt="8px"
              >
                Aksesoris
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
