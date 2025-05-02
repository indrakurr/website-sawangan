import { Container, Flex, Grid, GridItem, Text, Box } from "@chakra-ui/react";
import Logo from "../../assets/logo-sawangan.svg";

export default function Footer(props) {
  const aboutLink = [
    { text: "Toko Sawangan 1", link: "/about#toko-sawangan" },
    { text: "Mengapa Kami", link: "/about#mengapa-kami" },
    { text: "Jam Operasional", link: "/about#jam-operasional" },
    { text: "Galeri", link: "/about#galeri" },
  ];


 const socialMediaLink = [
   { text: "Instagram", link: "https://www.instagram.com/sawangan_no1/" },
   {
     text: "YouTube",
     link: "https://www.youtube.com/channel/UCEu-UZAiD6hNdFBg4BMFS-w",
   },
   { text: "Facebook", link: "https://www.facebook.com/SawanganSatu" },
 ];


  return (
    <Box as="footer" bg="white" borderTop="2px solid #E2E8F0" {...props}>
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
                <Text fontSize={"16px"} fontWeight={"bold"} color={"black"}>
                  Alamat
                </Text>
                <Text fontSize={"16px"} color={"black"}>
                  Jl. Mayjend. Sutoyo No.23, Sawangan, Kedungwuluh, Kec.
                  Purwokerto Bar., Kabupaten Banyumas, Jawa Tengah 53131
                </Text>
              </div>
              <div className="flex flex-col">
                <Text fontSize={"16px"} fontWeight={"bold"} color={"black"}>
                  Contact
                </Text>
                <Text fontSize={"16px"} color={"black"}>
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
              <FooterColumn title="Tentang Kami" items={aboutLink} />
              <FooterColumn title="Media Sosial" items={socialMediaLink} />
            </Flex>
          </GridItem>
        </Grid>
      </Container>

      <Box
        textAlign="center"
        bg="white"
        w="100%"
        py={4}
        color="black"
        borderTop="2px solid #E2E8F0"
      >
        © 2025 Sawangan 1. All rights reserved
      </Box>
    </Box>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="space-y-3">
      <Text fontSize={"16px"} fontWeight={"bold"} color={"black"}>
        {title}
      </Text>
      <ul className="flex flex-col gap-3 lg:text-lg">
        {items.map((link, index) => (
          <li key={index}>
            <Text as="a" href={link.link} fontSize={"16px"} color={"black"}>
              {link.text}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
