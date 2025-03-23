import JumbotronImg from "../../assets/hero-banner.png";
import JumbotronImgVertical from "../../assets/hero-banner-vertical.png";
import { Container, Grid, GridItem, Text } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Container
      paddingX={{ sm: "20px", lg: "96px" }}
      paddingY={{ sm: "96px", lg: "96px" }}
    >
      <Grid
        borderRadius={{ sm: "16px", lg: "32px" }}
        padding={{ sm: "16px", lg: "96px" }}
        className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 justify-start bg-cover bg-center  h-[624px]"
        bgImage={{
          sm: `url(${JumbotronImgVertical})`,
          lg: `url(${JumbotronImg})`,
        }}
      >
        <GridItem className="col-span-1 flex flex-col justify-center">
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={"40px"}
            fontWeight="bold"
            color="White"
            marginY={"12px"}
          >
            Beli Oleh-oleh Khas Purwokerto, dari Ujung Jari!
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={"16px"}
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
