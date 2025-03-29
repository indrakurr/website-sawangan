import { Container, Grid, GridItem, Image, Text, Flex } from "@chakra-ui/react";

// Import gambar
import Gallery1 from "../../assets/gallery-img-1.png";
import Gallery2 from "../../assets/gallery-img-2.png";
import Gallery3 from "../../assets/gallery-img-3.png";
import Gallery4 from "../../assets/gallery-img-4.png";
import Gallery5 from "../../assets/gallery-img-5.png";
import Gallery6 from "../../assets/gallery-img-6.png";
import Gallery7 from "../../assets/gallery-img-7.png";
import Gallery8 from "../../assets/gallery-img-8.png";
import Gallery9 from "../../assets/gallery-img-9.png";
import Gallery10 from "../../assets/gallery-img-10.png";
import Gallery11 from "../../assets/gallery-img-11.png";
import Gallery12 from "../../assets/gallery-img-12.png";

const images = [
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery7,
  Gallery8,
  Gallery9,
  Gallery10,
  Gallery11,
  Gallery12,
];

export default function Gallery() {
  return (
    <Container paddingX={{ sm: "20px", lg: "72px" }} marginY="76px">
      <Grid gap={10}>
        {/* Headline */}
        <GridItem textAlign="center">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Galeri Toko Sawangan 1
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
          >
            Lihat berbagai sudut dan suasana di Toko Sawangan 1
          </Text>
        </GridItem>

        {/* Grid Galeri */}
        <GridItem>
          <Flex
            flexWrap="wrap"
            justify="center"
            gap={{ base: "12px", lg: "24px" }}
          >
            {images.map((src, index) => (
              <Image
                key={index}
                rounded="xl"
                w={{ base: "100px", sm: "140px", md: "180px", lg: "200px" }}
                h={{ base: "100px", sm: "140px", md: "180px", lg: "200px" }}
                src={src}
                alt={`Gallery-${index + 1}`}
              />
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
