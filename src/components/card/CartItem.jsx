import { Button, Box, Checkbox, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import Counter from "../counter/Counter";
import { Trash } from "iconsax-react";

export default function CartItem() {
  return (
    <Box
      w={{ base: "100%", lg: "800px" }}
      display="flex"
      alignItems={{ base: "start", lg: "center" }}
      justifyContent="start"
      gap={{ base:"12px", lg: "24px"}}
      p={4}
      borderRadius={{ base: "md", lg: "xl" }}
      bg="white"
      boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
    >
      <Checkbox.Root colorPalette="orange" variant="solid">
        <Checkbox.HiddenInput />
        <Checkbox.Control color="white" />
      </Checkbox.Root>
      <Image
        className="w-64 h-48"
        boxSize="80px"
        borderRadius="md"
        src="https://www.astronauts.id/blog/wp-content/uploads/2022/08/Makanan-Khas-Daerah-tiap-Provinsi-di-Indonesia-Serta-Daerah-Asalnya.jpg"
        alt="gambar-produk"
      />
      <Box>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "4px", lg: "24px" }}
          marginBottom={"16px"}
        >
          <Text
            maxW="480px"
            maxH="40px"
            wordBreak="break-word"
            textAlign="start"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="regular"
            color="black"
            lineHeight={"1.2"}
          >
            Mendoan Sawangan hraaras asdanasd Mendoan Sawangan hraaras Mendoan
          </Text>
          <Spacer />
          <Text
            textAlign="start"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="bold"
            color="black"
            lineHeight={"1"}
          >
            Rp 450.000
          </Text>
        </Flex>
        <Flex gap={"16px"} justifyContent={"end"}>
          <Button
            size={"sm"}
            bg="transparent"
            rounded={"xl"}
            px={0}
            py={0}
            border={"none"}
          >
            <Trash style={{ width: "24px", height: "24px" }} color="black" />
          </Button>
          <Counter scale={0.8} fontSize="12px" />
        </Flex>
      </Box>
    </Box>
  );
}
