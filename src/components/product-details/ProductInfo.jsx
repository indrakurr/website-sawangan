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

export default function ProductInfo({ product }) {
  return (
    <Container className="product-detail" marginTop={"80px"}>
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
            src={product.imageUrl}
            alt={product.name}
            borderRadius={{ base: "12px", lg: "24px" }}
            w="full"
            h={{ base: "200px", lg: "400px" }}
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
            {product.name}
          </Text>
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "20px", lg: "32px" }}
            fontWeight="semibold"
            color="#F77E21"
            lineHeight={"1.2"}
          >
            Rp {product.price.toLocaleString("id-ID")}
          </Text>
          <Text
            textAlign="justify"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="normal"
            lineHeight={1.3}
            color="black"
            overflow="hidden"
            display="-webkit-box"
            style={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.description}
          </Text>
          <HStack style={{ gap: "1px" }}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={
                    i < Math.round(product.ratingAvg || 0) ? "#FFA500" : "#ccc"
                  }
                  weight="fill"
                />
              ))}
            <Text color={"gray.800"} textStyle={"xs"}>
              {product.ratingAvg?.toFixed(1) || "0.0"}
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
