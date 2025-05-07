import { Box, Image, Text } from "@chakra-ui/react";

export default function CheckoutItem({ product, quantity }) {
  const total = product.price * quantity;

  return (
    <Box
      w="100%"
      display="flex"
      alignItems="start"
      justifyContent="space-between"
      gap={{ base: "12px", lg: "24px" }}
      paddingY={4}
      borderBottom={1.5}
      borderStyle={"solid"}
      borderColor={"gray.200"}
    >
      <Image
        w={"80px"}
        h={"80px"}
        minW={"80px"}
        minH={"80px"}
        borderRadius="md"
        src={product.imageUrl}
        alt={product.name}
      />
      <Box w="full">
        <Text
          maxW={{ base: "160px", lg: "332px" }}
          maxH="40px"
          wordBreak="break-word"
          textAlign="start"
          fontSize={{ base: "12px", lg: "16px" }}
          fontWeight="semibold"
          color="black"
          lineHeight={"1"}
        >
          {product.name}
        </Text>
        <Text
          marginTop="8px"
          maxH="40px"
          wordBreak="break-word"
          textAlign="start"
          fontSize={{ base: "12px", lg: "16px" }}
          fontWeight="regular"
          color="gray.400"
          lineHeight={"1"}
        >
          Total : {quantity} x Rp {product.price.toLocaleString("id-ID")}
        </Text>
      </Box>
      <Text
        width={"2/6"}
        textAlign="end"
        fontSize={{ base: "12px", lg: "16px" }}
        fontWeight="bold"
        color="black"
        lineHeight={"1"}
      >
        Rp {total.toLocaleString("id-ID")}
      </Text>
    </Box>
  );
}
