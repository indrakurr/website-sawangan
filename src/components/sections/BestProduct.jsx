import { Box, Container, Flex, Grid, GridItem, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardProduk from "../card/CardProduk";
import axios from "axios";

const TARGET_IDS = [
  "aa52b531-481d-49e5-8555-8cfc75420f13",
  "1663e6b0-6d9f-4cfd-a99e-bf1ef28c3d43",
  "abd4667c-b520-47f7-b728-2b5677a91b32",
  "116c5769-f338-446c-b0ab-227f078c6161",
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
