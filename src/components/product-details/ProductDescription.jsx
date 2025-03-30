import {
  Container,
  Grid,
  GridItem,
  Text,
  DataList,
} from "@chakra-ui/react";

const productSpecs = [
  { label: "Kategori", value: "Makanan" },
  { label: "Stok", value: "50" },
  { label: "Berat Produk", value: "0.3 kg" },
  { label: "Tanggal Kadaluarsa", value: "Desember 2026" },
];

export default function ProductDescription() {
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
            fontSize={{ base: "20px", lg: "32px" }}
            fontWeight="bold"
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at
            lobortis sapien. Integer aliquam aliquet odio quis accumsan. Quisque
            rhoncus in augue vitae euismod. Sed eu tempor sapien, ut lacinia
            ligula. Cras egestas porta arcu, sed placerat nunc euismod non. Nunc
            mi tortor, auctor et congue ac, varius sit amet ante. Donec eu velit
            pharetra, imperdiet elit eu, malesuada felis. Proin pretium, tellus
            ut tempor cursus, augue dui ultrices erat, quis sodales felis nunc
            eu urna. Mauris auctor id velit a feugiat. Donec sagittis at enim
            nec pretium. Suspendisse quis mauris maximus, pharetra diam aliquet,
            rhoncus nisl. Pellentesque ante ligula, cursus non metus aliquet,
            consequat aliquam risus. Curabitur volutpat maximus arcu, non
            vehicula mi posuere eget. Nunc a placerat nibh.
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "20px", lg: "32px" }}
            fontWeight="bold"
            color="black"
            lineHeight={"0.8"}
            marginTop={{ base: "16px", lg: "24px" }}
          >
            Spesifikasi Produk
          </Text>
          <DataList.Root orientation="horizontal">
            {productSpecs.map((spec) => (
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
