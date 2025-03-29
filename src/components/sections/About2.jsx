import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Rocket from "../../assets/rocket.png";
import Star from "../../assets/star.png";
import Thumb from "../../assets/thumb.png";

export default function About2() {
  return (
    <Container marginY={"96px"}>
      <Grid gap={10} marginX={{ base: "24px", lg: "72px" }}>
        {/* Headline */}
        <GridItem textAlign="center">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Kenapa Beli Oleh-oleh Kami?
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
          >
            Temukan berbagai alasan yang akan membuatmu untuk selalu memilih
            Produk Oleh-oleh Kami
          </Text>
        </GridItem>

        <GridItem>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap={6}
            flexWrap="wrap"
            direction={{ base: "column", lg: "row" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              justifyContent="start"
              gap={"12px"}
              p={{ base: "16px", lg: "24px" }}
              w={"xs"}
              borderRadius="20px"
              cursor="pointer"
              bg="#D61C4E"
            >
              <img src={Thumb} width="60" />
              <Text
                fontSize={{ base: "16px", lg: "24px" }}
                fontWeight="semibold"
                color="white"
                lineHeight={"1.2"}
              >
                Beli Oleh-oleh Tinggal Klik
              </Text>
              <Text
                fontSize={{ base: "14px", lg: "16px" }}
                fontWeight="regular"
                color="white"
              >
                Nikmati kemudahan berbelanja oleh-oleh tanpa repot! Dengan
                sekali klik, Anda bisa mendapatkan oleh-oleh favorit langsung
                diantar ke rumah.
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              justifyContent="start"
              gap={"12px"}
              p={{ base: "16px", lg: "24px" }}
              w={"xs"}
              borderRadius="20px"
              cursor="pointer"
              bg="#F77E21"
            >
              <img src={Star} width="60" />
              <Text
                fontSize={{ base: "16px", lg: "24px" }}
                fontWeight="semibold"
                color="white"
                lineHeight={"1.2"}
              >
                Rasa Legendaris Langganan Artis
              </Text>
              <Text
                fontSize={{ base: "14px", lg: "16px" }}
                fontWeight="regular"
                color="white"
              >
                Rasa autentik yang melegenda, favorit banyak orang hingga para
                artis. Dibuat dengan resep istimewa untuk cita rasa yang tak
                terlupakan.
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              justifyContent="start"
              gap={"12px"}
              p={{ base: "16px", lg: "24px" }}
              w={"xs"}
              borderRadius="20px"
              cursor="pointer"
              bg="#FAC213"
            >
              <img src={Rocket} width="60" />
              <Text
                fontSize={{ base: "16px", lg: "24px" }}
                fontWeight="semibold"
                color="white"
                lineHeight={"1.2"}
              >
                Cita Rasa Asli Purwokerto
              </Text>
              <Text
                fontSize={{ base: "14px", lg: "16px" }}
                fontWeight="regular"
                color="white"
              >
                Oleh-oleh dengan cita rasa khas Purwokerto, dibuat dari resep
                tradisional dan bahan berkualitas. Autentik, lezat, dan penuh
                kenangan!
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
