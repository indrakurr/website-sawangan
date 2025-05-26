import { Box, Container, Flex, Grid, GridItem, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardProduk from "../card/CardProduk";
import axios from "axios";

const TARGET_IDS = [
  "22d2413d-3c2d-45d1-8d60-97a7754cbc07",
  "e33a2072-7688-4be9-a6d8-45e35067eb29",
  "b72293f2-aff0-4ced-9563-b4d25a23b9bb",
  "5c28c7bb-9a6a-4c50-828b-3d298eb8fe53",
];

export default function BestProduct() {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        const allProducts = res.data?.data || [];

        // Filter produk berdasarkan ID yang diinginkan
        const filtered = allProducts.filter((product) =>
          TARGET_IDS.includes(product.id)
        );

        // Urutkan sesuai urutan di TARGET_IDS
        const sorted = TARGET_IDS.map((id) =>
          filtered.find((product) => product.id === id)
        ).filter(Boolean); // pastikan tidak ada undefined

        setBestProducts(sorted);
      } catch (err) {
        console.error("Gagal memuat produk terlaris:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container
      marginY={{ base: "32px", lg: "96px" }}
    >
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

        {/* Produk Terlaris */}
        <GridItem>
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            gap={{ base: 2, md: 4 }}
            gapY={{ base: 2, md: 4 }}
            px={{ base: 0, md: 6, lg: 180 }}
          >
            {bestProducts.map((product) => (
              <CardProduk key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Container>
  );
}
