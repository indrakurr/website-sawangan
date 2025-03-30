import { Container, Flex, Grid, GridItem, Text, Box } from "@chakra-ui/react";
import Logo from "../../assets/logo-sawangan.svg";

export default function Footer() {
const productLink = [
  { text: "Makanan", link: "#" },
  { text: "Minuman", link: "#" },
  { text: "Aksesoris", link: "#" },
];

const aboutLink = [
  { text: "Toko Sawangan 1", link: "#" },
  { text: "Mengapa Kami", link: "#" },
  { text: "Jam Operasional", link: "#" },
  { text: "Galeri", link: "#" },
];

const socialMediaLink = [
  { text: "Instagram", link: "#" },
  { text: "YouTube", link: "#" },
  { text: "Facebook", link: "#" },
];

  return (
    <footer className="bg-white" style={{ borderTop: "2px solid #E2E8F0" }}>
      <Container
        paddingX={{ base: "20px", lg: "" }}
        paddingY={{ base: "20px", lg: "64px" }}
      >
        <Grid className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 justify-start gap-8">
          <GridItem className="col-span-1" w="full">
            <Flex
              gap="24px"
              direction="column"
              justify="start"
              paddingRight={"60px"}
            >
              <img src={Logo} alt="navbar-logo" width="198px" />
              <div className="flex flex-col">
                <Text
                  textAlign={"left"}
                  fontSize={"16px"}
                  fontWeight={"Bold"}
                  color={"black"}
                >
                  Alamat
                </Text>
                <Text
                  textAlign={"left"}
                  fontSize={"16px"}
                  fontWeight={"regular"}
                  color={"black"}
                >
                  Jl. Mayjend. Sutoyo No.23, Sawangan, Kedungwuluh, Kec.
                  Purwokerto Bar., Kabupaten Banyumas, Jawa Tengah 53131
                </Text>
              </div>
              <div className="flex flex-col">
                <Text
                  textAlign={"left"}
                  fontSize={"16px"}
                  fontWeight={"Bold"}
                  color={"black"}
                >
                  Contact
                </Text>
                <Text
                  textAlign={"left"}
                  fontSize={"16px"}
                  fontWeight={"regular"}
                  color={"black"}
                >
                  +62 852-2710-0200
                </Text>
              </div>
            </Flex>
          </GridItem>
          <GridItem className="col-span-1" w="full">
            <Flex
              gap="60px"
              direction="row"
              justify={{ base: "start", md: "end" }}
            >
              <div className="space-y-3">
                <ul className="flex flex-col gap-3 lg:text-lg">
                  <Text
                    textAlign={"left"}
                    fontSize={"16px"}
                    fontWeight={"Bold"}
                    color={"black"}
                  >
                    Produk
                  </Text>
                  {productLink.map((link, index) => (
                    <li key={index}>
                      <Text
                        textAlign={"left"}
                        fontSize={"16px"}
                        color={"black"}
                        href={link.link}
                      >
                        {link.text}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <ul className="flex flex-col gap-3 lg:text-lg">
                  <Text
                    textAlign={"left"}
                    fontSize={"16px"}
                    fontWeight={"Bold"}
                    color={"black"}
                  >
                    Tentang Kami
                  </Text>
                  {aboutLink.map((link, index) => (
                    <li key={index}>
                      <Text
                        textAlign={"left"}
                        fontSize={"16px"}
                        color={"black"}
                        href={link.link}
                      >
                        {link.text}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <ul className="flex flex-col gap-3 lg:text-lg">
                  <Text
                    textAlign={"left"}
                    fontSize={"16px"}
                    fontWeight={"Bold"}
                    color={"black"}
                  >
                    Media Sosial
                  </Text>
                  {socialMediaLink.map((link, index) => (
                    <li key={index}>
                      <Text
                        textAlign={"left"}
                        fontSize={"16px"}
                        color={"black"}
                        href={link.link}
                      >
                        {link.text}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
      <Box
        className="text-center"
        background="white"
        width="100%"
        padding="4"
        color="black"
        borderTop="2px solid #E2E8F0"
      >
        © 2025 Sawangan 1. All rights reserved
      </Box>
    </footer>
  );
}
