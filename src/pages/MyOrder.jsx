import {
  Box,
  ButtonGroup,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/sections/Footer";
import FilterButton from "../components/buttons/FilterButton";
import CartOrder from "../components/card/CartOrder";

export default function MyOrder() {
  const [activeFilter, setActiveFilter] = useState("Dikirim");
  const buttonLabels = ["Belum Bayar", "Dikirim", "Selesai", "Dibatalkan"];

  return (
    <>
      <div
        className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <Container paddingX={{ base: "12px", lg: "200px" }}>
          <Text
            marginTop={{ base: "72px", lg: "89px" }}
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
          >
            Pesanan Saya
          </Text>
          <Box
            bg="white"
            borderRadius="xl"
            padding={{ base: "16px", lg: "24px" }}
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            marginTop={{ base: "16px", lg: "24px" }}
            marginBottom={{ base: "24px", lg: "52px" }}
          >
            <Box overflowX="auto">
              <ButtonGroup spacing={0}>
                {buttonLabels.map((label) => (
                  <FilterButton
                    key={label}
                    label={label}
                    isActive={label === activeFilter}
                    onClick={() => setActiveFilter(label)}
                  />
                ))}
              </ButtonGroup>
            </Box>
            <VStack marginTop={"24px"} gap={3}>
              <CartOrder />
              <CartOrder />
              <CartOrder />
              <CartOrder />
            </VStack>
          </Box>
        </Container>
        <Footer />
      </div>
    </>
  );
}
