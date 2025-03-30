import JumbotronImg from "../../assets/hero-banner.png";
import JumbotronImgVertical from "../../assets/hero-banner-vertical.png";
import { Container, Grid, GridItem, Text } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Container
      paddingX={{ base: "16px", lg: "96px" }}
      paddingTop={{ base: "16px", lg: "96px" }}
      marginTop={{ base: "60px", lg: "0" }}
      marginBottom={{ base: "32px", lg: "48px" }}
    >
      <Grid
        borderRadius={{ base: "16px", lg: "32px" }}
        padding={{ base: "16px", lg: "96px" }}
        className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 justify-start bg-cover bg-center  h-[624px]"
        bgImage={{
          base: `url(${JumbotronImgVertical})`,
          lg: `url(${JumbotronImg})`,
        }}
      >
        <GridItem className="col-span-1 flex flex-col justify-start lg:justify-center">
          <Text
            textAlign={{ base: "center", md: "left", lg: "left" }}
            fontSize={{ base: "32px", lg: "40px" }}
            fontWeight="bold"
            color="White"
            marginY={"12px"}
            lineHeight={"1.2"}
          >
            Beli Oleh-oleh Khas Purwokerto, dari Ujung Jari!
          </Text>
          <Text
            textAlign={{ base: "center", md: "left", lg: "left" }}
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight={"semibold"}
            color="white"
            marginY={"12px"}
          >
            Temukan berbagai pilihan oleh-oleh khas Purwokerto dengan cita rasa
            autentik. Pesan dengan mudah, cepat, dan praktis langsung dari
            rumahmu!
          </Text>
        </GridItem>
        <GridItem className="col-span-2 w-full h-full"></GridItem>
      </Grid>
    </Container>
  );
}
