import {
  Button,
  DataList,
  Dialog,
  Portal,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { CloseSquare } from "iconsax-react";
import StepProgressCustom from "../../steps/StepProgress";
import ProdukItem from "../../card/CartModal";
import { useGetOrderByIdQuery, useCancelOrderMutation } from "../../../store/store";
import { toaster } from "../../ui/toaster";

const ModalOrderDetailPending = ({ isOpen, onClose, orderId }) => {
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const order = data?.data;

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
 
  if (!order && !isLoading) return null;
  const orderDetail = [
    {
      label: "Nama Penerima",
      value: order?.shippingDetails?.recipientName || "-",
    },
    {
      label: "Nomor Telepon",
      value: order?.shippingDetails?.phoneNumber || "-",
    },
    { label: "Alamat", value: order?.shippingAddress || "-" },
    { label: "Kode Pos", value: order?.shippingPostCode || "-" },
  ];

  const handleCancel = async () => {
    try {
      await cancelOrder(orderId).unwrap();
      toaster.success({ title: "Pesanan berhasil dibatalkan", duration: 4000, });
      onClose();
    } catch (err) {
      toaster.error({
        title: "Gagal membatalkan pesanan",
        description:
          err?.data?.errors ||
          "Terjadi kesalahan. Silakan coba lagi atau hubungi admin.",
        duration: 4000,
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(8px)" bg="rgba(0, 0, 0, 0.4)" />
        <Dialog.Positioner padding={{ base: 3, lg: 0 }}>
          <Dialog.Content
            borderRadius="2xl"
            bg="white"
            maxW="3xl"
            w="full"
            p={{ base: 4, lg: 6 }}
            gap={{ base: 4, lg: 6 }}
            boxShadow="none"
          >
            <Dialog.Header mb={4} padding={0} justifyContent={"space-between"}>
              <Text
                fontSize={{ base: "20px", lg: "24px" }}
                fontWeight="bold"
                color="black"
                lineHeight={1}
              >
                Detail Pesanan
              </Text>
              <Box
                position="absolute"
                top={{ base: 3, lg: 4 }}
                right={{ base: 3, lg: 4 }}
              >
                <Box cursor="pointer" onClick={onClose}>
                  <CloseSquare size="32" color="#828282" />
                </Box>
              </Box>
            </Dialog.Header>

            <Dialog.Body as={VStack} align="stretch" gap={6} padding={0}>
              {/* Step Progress */}
              <Box w="full">
                <StepProgressCustom
                  activeStep={0}
                  createdAt={order?.createdAt}
                  shippedAt={order?.timestamps?.shippedAt}
                  completedAt={order?.timestamps?.completedAt}
                />
              </Box>

              <Box w={"full"}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="semibold"
                  color="black"
                  lineHeight={1}
                >
                  Detail Pengiriman
                </Text>
                <DataList.Root orientation="horizontal" gap={3} marginTop={6}>
                  {orderDetail.map((spec) => (
                    <DataList.Item key={spec.label}>
                      <DataList.ItemLabel fontSize={{ base: 12, lg: 14 }}>
                        {spec.label}
                      </DataList.ItemLabel>
                      <DataList.ItemValue
                        color="black"
                        fontSize={{ base: 12, lg: 14 }}
                      >
                        {spec.value}
                      </DataList.ItemValue>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              </Box>

              {/* Produk */}
              <Box w="full">
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="semibold"
                  color="black"
                  lineHeight={1}
                >
                  Detail Produk
                </Text>
                <ProdukItem items={order?.items || []} />
              </Box>

              {/* Footer */}
              <Flex w="full" justifyContent="end">
                <HStack spacing={3}>
                  <Button
                    size={"sm"}
                    bg={"transparent"}
                    color={"orange.500"}
                    borderColor={"orange.500"}
                    rounded={"xl"}
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.500", color: "white" }}
                    onClick={handleCancel}
                    isLoading={isCancelling}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Batalkan Pesanan
                    </Text>
                  </Button>
                  <Button
                    as="a"
                    href={order?.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size={"sm"}
                    bg={"orange.500"}
                    color={"white"}
                    rounded={"xl"}
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.600" }}
                    isDisabled={!order?.paymentUrl}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Pembayaran
                    </Text>
                  </Button>
                </HStack>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ModalOrderDetailPending;
