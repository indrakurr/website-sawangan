import { Box, Image, Text, Flex } from "@chakra-ui/react";

export default function ProdukItem({ items = [] }) {
  return (
    <Box >
      {items.map((item, index) => (
        <Box key={index}>
          <Box
            w="100%"
            display="flex"
            alignItems="start"
            justifyContent="space-between"
          >
            <Flex gap={{ base: 3, lg: 6 }}>
              <Image
                w={{ base: "50px", lg: "80px" }}
                h={{ base: "50px", lg: "80px" }}
                minW={{ base: "50px", lg: "80px" }}
                minH={{ base: "50px", lg: "80px" }}
                borderRadius="md"
                src={item.image}
                alt={item.name}
              />
              <Box>
                <Text
                  maxW="90%"
                  wordBreak="break-word"
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight="semibold"
                  color="black"
                  lineHeight="1"
                >
                  {item.name}
                </Text>
                <Text
                  mt={2}
                  fontSize={{ base: "12px", lg: "16px" }}
                  color="gray.400"
                >
                  Total : {item.quantity}
                </Text>
              </Box>
            </Flex>
            <Text
              minW="70px"
              textAlign="start"
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight="bold"
              color="black"
              lineHeight="1"
            >
              Rp {item.total.toLocaleString("id-ID")}
            </Text>
          </Box>

          {index !== items.length - 1 && <Box h="1px" bg="gray.100" my={4} />}
        </Box>
      ))}
    </Box>
  );
}
