import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Star, ShoppingCart } from "@phosphor-icons/react";
import Counter from "../counter/Counter";

export default function ProductInfo() {
  return (
    <Container className="product-detail" marginTop={"140px"}>
      <Grid
        className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-rows-1 justify-start sm:gap-6 lg:gap-24 bg-white"
        borderRadius={{ base: "16px", lg: "24px" }}
        padding={{ base: "16px", lg: "54px" }}
        w="full"
        maxW="100%"
        overflow="hidden"
      >
        <GridItem
          className="col-span-1"
          w="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            className="w-full h-full"
            borderRadius={{ base: "12px", lg: "24px" }}
            src="https://www.astronauts.id/blog/wp-content/uploads/2022/08/Makanan-Khas-Daerah-tiap-Provinsi-di-Indonesia-Serta-Daerah-Asalnya.jpg"
            alt="product-detail-image"
          />
        </GridItem>
        <GridItem className="col-span-1 flex flex-col gap-4" w="full">
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "24px", lg: "40px" }}
            fontWeight="bold"
            color="black"
            lineHeight={"1.2"}
            marginTop={{ base: "16px", lg: "0px" }}
          >
            Nama Produk
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "20px", lg: "32px" }}
            fontWeight="semibold"
            color="#F77E21"
            lineHeight={"1.2"}
          >
            Rp 123.456
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight={"regular"}
            color="black"
          >
            Detail Produk Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Aliquam vel finibus augue. In aliquet purus mauris, vel dictum
            est egestas et.
          </Text>
          <HStack style={{ gap: "1px" }}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={i < 4 ? "#FFA500" : "#ccc"}
                  weight="fill"
                />
              ))}
            <Text color={"gray.800"} textStyle={"xs"}>
              4.5
            </Text>
          </HStack>
          <Flex direction="column" marginTop="6" gap={6}>
            <Counter />
            <Button
              size={"sm"}
              width={"max-content"}
              bg={"orange.500"}
              color={"white"}
              rounded={"xl"}
              px={5}
              py={5}
              _hover={{ bg: "orange.600" }}
            >
              <ShoppingCart
                style={{ width: "24px", height: "24px" }}
                color="white"
                weight="light"
              />
              <Text lineHeight="1" whiteSpace="nowrap">
                Masukkan Keranjang
              </Text>
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
