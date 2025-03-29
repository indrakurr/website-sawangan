import { Badge, Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { ClockUser } from "@phosphor-icons/react";

const days = [
  { day: "Senin", time: "06.00 - 21.00" },
  { day: "Selasa", time: "06.00 - 21.00" },
  { day: "Rabu", time: "06.00 - 21.00" },
  { day: "Kamis", time: "06.00 - 21.00" },
  { day: "Jumat", time: "06.00 - 21.00" },
  { day: "Sabtu", time: "07.00 - 22.00" },
  { day: "Minggu", time: "07.00 - 22.00" },
];

export default function Time() {
  return (
    <Container
      paddingX={{ sm: "20px", lg: "80px" }}
      paddingY="100px"
      marginY="76px"
    >
      <Grid gap={10} marginX={{ base: "24px", lg: "72px" }}>
        {/* Headline */}
        <GridItem textAlign="center">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Jam Operasional Toko
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
          >
            Kunjungi toko kami di jam terbaik! Berikut adalah jam operasional
            kami untuk memastikan Anda mendapatkan layanan terbaik.
          </Text>
        </GridItem>

        {/* Grid Jam Operasional */}
        <GridItem>
          <Flex justify="center" gap={6} wrap="wrap">
            {days.map((item, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="start"
                justifyContent="start"
                gap={"4px"}
                p={{ base: "12px", lg: "16px" }}
                borderRadius="20px"
                cursor="pointer"
                bg="white"
                boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
                w="260px"
              >
                <div className="flex w-full justify-end">
                  <Badge
                    variant="solid"
                    bg="#FEF3D0"
                    padding={"4px"}
                    borderRadius={"xl"}
                  >
                    <ClockUser size={36} color="#F77E21" />
                  </Badge>
                </div>
                <Text
                  fontSize={{ base: "16px", lg: "20px" }}
                  fontWeight="semibold"
                  color="black"
                >
                  {item.day}
                </Text>
                <Text
                  fontSize={{ base: "24px", lg: "28px" }}
                  fontWeight="bold"
                  color="#D61C4E"
                  lineHeight={"1.2"}
                >
                  {item.time}
                </Text>
              </Box>
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
