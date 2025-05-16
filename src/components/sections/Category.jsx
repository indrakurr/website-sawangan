import { Box, Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Backpack, Brandy, Bread } from "@phosphor-icons/react";

export default function Category() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const sharedBoxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: { base: "16px", lg: "24px" },
    borderRadius: "20px",
    w: { base: "100px", lg: "160px" },
    h: { base: "100px", lg: "160px" },
    cursor: "pointer",
    bg: "linear-gradient(135deg, #F77E21 0%, #FAC213 100%)",
    _hover: { bg: "#F77E21" },
  };

  const iconProps = {
    size: 40,
    color: "white",
    weight: "light",
  };

  const textProps = {
    fontSize: { base: "12px", lg: "16px" },
    fontWeight: "semibold",
    color: "white",
    mt: "8px",
  };

  return (
    <Container marginY={{ base: "32px", lg: "48px" }}>
      <Grid gap={10}>
        {/* Headline */}
        <GridItem textAlign="center">
          <Text
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Jelajahi Kategori
          </Text>
          <Text
            fontSize={{ base: "14px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
          >
            Temukan berbagai kategori oleh-oleh khas Purwokerto yang tersedia
            untukmu
          </Text>
        </GridItem>

        {/* Kategori Box */}
        <GridItem>
          <Flex justify="center" gap={{ base: 2, lg: 4 }} direction="row">
            <Box onClick={() => handleClick("Makanan")} {...sharedBoxProps}>
              <Bread {...iconProps} />
              <Text {...textProps}>Makanan</Text>
            </Box>

            <Box onClick={() => handleClick("Minuman")} {...sharedBoxProps}>
              <Brandy {...iconProps} />
              <Text {...textProps}>Minuman</Text>
            </Box>

            <Box onClick={() => handleClick("Aksesoris")} {...sharedBoxProps}>
              <Backpack {...iconProps} />
              <Text {...textProps}>Aksesoris</Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
