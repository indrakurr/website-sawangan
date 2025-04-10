import { Button, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Show } from "react-iconly";
import ModalOrderDetailPending from "../modal/my-order/ModalOrderDetailPending";
import { useState } from "react";

const CartOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
      >
        <Image
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
                fontWeight="normal"
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

          <Flex mt={3} justifyContent="end">
            <Button
              size="sm"
              bg={{ base: "white", lg: "orange.500" }}
              color={{ base: "orange.500", lg: "white" }}
              rounded="xl"
              px={{ base: 2, lg: 4 }}
              py={5}
              gap={2}
              border="1px solid"
              borderColor={{base:"transparent", lg:"orange.500"}}
              _hover={{ bg: { base: "gray.50", lg: "orange.600" } }}
              onClick={() => setIsOpen(true)}
            >
              <Box display={{ base: "none", lg: "block" }}>
                <Show size="24" color="currentColor" />
              </Box>
              <Text lineHeight="1" whiteSpace="nowrap">
                Detail Pesanan
              </Text>
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Modal Detail */}
      <ModalOrderDetailPending
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default CartOrder;
