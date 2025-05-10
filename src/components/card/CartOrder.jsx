import { Button, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Show } from "react-iconly";
import { useState } from "react";
import ModalOrderDetailPending from "../modal/my-order/ModalOrderDetailPending";
import ModalOrderDetailPacked from "../modal/my-order/ModalOrderDetailPacked";
import ModalOrderDetailShipped from "../modal/my-order/ModalOrderDetailShipped";
import ModalOrderDetailCompleted from "../modal/my-order/ModalOrderDetailCompleted";
import ModalOrderDetailCanceled from "../modal/my-order/ModalOrderDetailCanceled";

const CartOrder = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const firstItem = order?.items?.[0];

  const renderModal = () => {
    const status = order?.status;
    if (status === "PENDING")
      return (
        <ModalOrderDetailPending
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      );
    if (status === "PACKAGED")
      return (
        <ModalOrderDetailPacked
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      );
    if (status === "SHIPPED")
      return (
        <ModalOrderDetailShipped
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      );
    if (status === "COMPLETED")
      return (
        <ModalOrderDetailCompleted
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      );
    if (status === "CANCELLED")
      return (
        <ModalOrderDetailCanceled
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      );
    return null;
  };

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
          src={firstItem?.image}
          alt={firstItem?.name}
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
                {firstItem?.name}
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
                Total :{" "}
                {order?.items?.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
            </Box>

            <Text
              textAlign={{ base: "start", lg: "end" }}
              fontSize={{ base: "12px", lg: "16px" }}
              fontWeight="bold"
              color="black"
              lineHeight="1"
            >
              Rp {order?.totalAmount?.toLocaleString("id-ID")}
            </Text>
          </Flex>

          <Flex  justifyContent="end">
            <Button
              size="sm"
              bg={{ base: "white", lg: "orange.500" }}
              color={{ base: "orange.500", lg: "white" }}
              rounded="xl"
              px={{ base: 2, lg: 4 }}
              py={{base:0, lg:5}}
              gap={2}
              border="1px solid"
              borderColor={{ base: "transparent", lg: "orange.500" }}
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

      {renderModal()}
    </>
  );
};

export default CartOrder;
