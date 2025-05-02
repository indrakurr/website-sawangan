import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import CardProduk from "../card/CardProduk";
import { Link as RouterLink } from "react-router-dom";

export default function ExploreProduct() {
  return (
    <Container marginY={"96px"}>
      <Grid gap={10}>
        {/* Headline */}
        <GridItem textAlign="center">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            ✨ Jelajahi Oleh-oleh Kami ✨
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
          >
            Temukan berbagai produk pilihan dengan kualitas terbaik dan harga
            menarik, hanya di Sawangan 1
          </Text>
        </GridItem>

        {/* Kategori Box */}
        <GridItem>
          <Flex justify="center" gap={6} wrap="wrap">
            <CardProduk />
            <CardProduk />
            <CardProduk />
            <CardProduk />
            <CardProduk />
            <CardProduk />
            <CardProduk />
            <CardProduk />
          </Flex>
        </GridItem>
        <GridItem className="flex justify-center">
          <Button
            as={RouterLink}
            to="/products"
            size={"sm"}
            bg={"orange.500"}
            color={"white"}
            borderRadius={"full"}
            px={6}
            py={4}
            _hover={{ bg: "orange.700" }}
          >
            Lihat Semua Produk
          </Button>
        </GridItem>
      </Grid>
    </Container>
  );
}
