import { Button, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Show } from "react-iconly";
import ModalOrderDetailPending from "../modal/my-order/ModalOrderDetailPending";

export default function CartOrder() {
  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems={{ base: "start", lg: "center" }}
        justifyContent="start"
        gap={{ base: "12px", lg: "24px" }}
        p={4}
        borderRadius={{ base: "md", lg: "xl" }}
        bg="white"
        boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
      >
        <Image
          className="w-64 h-48"
          boxSize="80px"
          borderRadius="md"
          src="https://www.astronauts.id/blog/wp-content/uploads/2022/08/Makanan-Khas-Daerah-tiap-Provinsi-di-Indonesia-Serta-Daerah-Asalnya.jpg"
          alt="gambar-produk"
        />
        <Box w="full">
          <Flex
            direction={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            gap={{ base: "4px", lg: "24px" }}
          >
            <Box>
              <Text
                maxW="100%"
                wordBreak="break-word"
                textAlign="start"
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight="semibold"
                color="black"
                lineHeight="1.2"
              >
                Mendoan Sawangan hraaras asdanasd Mendoan Sawangan hraaras
                Mendoan
              </Text>
              <Text
                maxW="100%"
                wordBreak="break-word"
                textAlign="start"
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight="regular"
                color="gray.500"
                lineHeight="1.2"
              >
                Total : 3
              </Text>
            </Box>
            <Text
              textAlign={{ base: "start", lg: "end" }}
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight="bold"
              color="black"
              lineHeight="1"
            >
              Rp 450.000
            </Text>
          </Flex>

          <Flex gap={"16px"} justifyContent={"end"}>
            <ModalOrderDetailPending>
              <Button
                size={"sm"}
                width={"max-content"}
                bg={{ base: "white", lg: "orange.500" }}
                color={{ base: "orange.500", lg: "white" }}
                rounded={"xl"}
                px={{ base: "0px", lg: "16px" }}
                py={5}
                _hover={{ bg: { base: "transparent", lg: "orange.600" } }}
              >
                <Box display={{ base: "none", lg: "block" }}>
                  <Show
                    style={{ width: "24px", height: "24px" }}
                    color={{ base: "orange.500", lg: "white" }}
                    weight="light"
                  />
                </Box>
                <Text lineHeight="1" whiteSpace="nowrap">
                  Detail Pesanan
                </Text>
              </Button>
            </ModalOrderDetailPending>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
