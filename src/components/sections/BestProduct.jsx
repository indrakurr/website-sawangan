import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import CardProduk from "../card/CardProduk";

export default function BestProduct() {
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
            ✨ Oleh-oleh Terlaris Kami ✨
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
          <Flex justify="center" gap={6} wrap="wrap">
            <CardProduk />
            <CardProduk />
            <CardProduk />
            <CardProduk />
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
