import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { WhatsappLogo } from "@phosphor-icons/react";

export default function ContactUs() {
  return (
    <Container
      paddingX={{ base: "20px", lg: "72px" }}
      paddingY={{ base: "24px", lg: "72px" }}
      marginBottom={"96px"}
      bg="gray.100"
      borderRadius={{ sm: "16px", lg: "32px" }}
    >
      <Grid
        className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 justify-start gap-8"
        marginX={{ base: "24px", lg: "0" }}
      >
        <GridItem
          className="col-span-1 flex flex-col gap-2"
          w="full"
          display="flex"
          alignItems={{ base: "center", lg: "flex-start" }}
          justifyContent="center"
          textAlign={{ base: "center", lg: "left" }}
        >
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Hubungi & Temukan Lokasi Kami
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={"16px"}
            fontWeight={"regular"}
            color="black"
            marginY={"12px"}
          >
            Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi
            kami! Kunjungi toko kami atau hubungi kami langsung melalui
            WhatsApp.
          </Text>
          <Flex
            paddingTop={4}
            gap={4}
            display="flex"
            justifyContent={{
              base: "flex-start",
              md: "flex-start",
              lg: "flex-start",
            }}
            alignItems="center"
          >
            <Button
              size={"sm"}
              bg={"orange.500"}
              rounded={"xl"}
              px={5}
              py={5}
              _hover={{ bg: "orange.600" }}
              border={"none"}
              color="white"
            >
              <WhatsappLogo
                style={{ width: "24px", height: "24px" }}
                color="white"
                weight="light"
              />
              WhatsApp
            </Button>
          </Flex>
        </GridItem>
        <GridItem
          className="col-span-1"
          w="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div className="maps" style={{ width: "100%", height: "100%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.0905360897084!2d109.22604026953663!3d-7.425114669677138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655e64ffd1bb43%3A0x293bb34935d4c671!2sToko%20Oleh%20Oleh%20Sawangan%20No.%201!5e0!3m2!1sid!2sid!4v1743243107332!5m2!1sid!2sid"
              style={{ width: "100%", height: "400px", borderRadius: "20px" }}
              title="Lokasi Sawangan 1"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </GridItem>
      </Grid>
    </Container>
  );
}
