import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import CardProduk from "../card/CardProduk";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ExploreProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        const allProducts = res.data?.data || [];
        const first8 = allProducts.slice(0, 8);
        setProducts(first8);
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
      }
    };

    fetch();
  }, []);

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

        {/* Produk Grid */}
        <GridItem>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            gap={{ base: 2, md: 4 }}
            gapY={{ base: 2, md: 4 }}
            px={{ base: 0, md: 6, lg: 180 }}
          >
            {products.map((product) => (
              <CardProduk key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </GridItem>

        {/* Tombol Lihat Semua */}
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
