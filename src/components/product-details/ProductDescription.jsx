import {
  Container,
  Grid,
  GridItem,
  Text,
  DataList,
} from "@chakra-ui/react";
import { format } from "date-fns"

export default function ProductDescription({ product }) {
  const formattedDate = product.expiryDate
    ? format(new Date(product.expiryDate), "MMMM yyyy")
    : "Tidak ada";

  const specs = [
    { label: "Kategori", value: product.category },
    { label: "Stok", value: product.stock },
    {
      label: "Berat Produk",
      value: `${product.weightInGrams || product.weight * 1000} gram`,
    },
    { label: "Tanggal Kadaluarsa", value: formattedDate },
  ];


  return (
    <Container className="product-description" marginTop={"10px"}>
      <Grid
        padding={{ base: "16px", lg: "54px" }}
        borderRadius={{ base: "16px", lg: "24px" }}
        bg="white"
        w="full"
        maxW="100%"
        overflow="hidden"
      >
        <GridItem className="col-span-1 flex flex-col gap-4" w="full">
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "20px", lg: "24px" }}
            fontWeight="semibold"
            color="black"
            lineHeight={"0.8"}
          >
            Deskripsi Produk
          </Text>
          <Text
            textAlign="justify"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight={"regular"}
            color="black"
          >
            {product.description}
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "20px", lg: "24px" }}
            fontWeight="semibold"
            color="black"
            lineHeight={"0.8"}
            marginTop={{ base: "16px", lg: "24px" }}
          >
            Spesifikasi Produk
          </Text>
          <DataList.Root orientation="horizontal">
            {specs.map((spec) => (
              <DataList.Item key={spec.label}>
                <DataList.ItemLabel>{spec.label}</DataList.ItemLabel>
                <DataList.ItemValue color="black">
                  {spec.value}
                </DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        </GridItem>
      </Grid>
    </Container>
  );
}
