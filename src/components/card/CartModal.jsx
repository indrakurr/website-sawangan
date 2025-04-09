import { Box, Image, Text, Flex } from "@chakra-ui/react";

export default function CartModal() {
  return (
    <Box
      w="100%"
      display="flex"
      alignItems="start"
      justifyContent="space-between"
      marginTop={6}
    >
      <Flex gap={{ base: 3, lg: 6 }}>
        <Image
          className="w-64 h-48"
          boxSize={{ base: "50px", lg: "80px" }}
          borderRadius="md"
          src="https://www.astronauts.id/blog/wp-content/uploads/2022/08/Makanan-Khas-Daerah-tiap-Provinsi-di-Indonesia-Serta-Daerah-Asalnya.jpg"
          alt="gambar-produk"
        />
        <Box>
          <Text
            maxW="90%"
            maxH="40px"
            wordBreak="break-word"
            textAlign="start"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="semibold"
            color="black"
            lineHeight={"1"}
          >
            Mendoan Sawangan hraaras asdanasd Mendn Sawangan hraaras
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
            Total :
          </Text>
        </Box>
      </Flex>
      <Text
        minW="70px"
        textAlign="start"
        fontSize={{ base: "12px", lg: "16px" }}
        fontWeight="bold"
        color="black"
        lineHeight={"1"}
      >
        Rp 450.000
      </Text>
    </Box>
  );
}
