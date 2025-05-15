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
import {
  useGetOrderByIdQuery,
  useCompleteOrderMutation,
} from "../../../store/store";
import TrackingOrder from "../../sections/TrackingOrder";
import { useState } from "react";
import { toaster } from "../../ui/toaster";

const ModalOrderDetailShipped = ({ isOpen, onClose, orderId }) => {
  const [showTracking, setShowTracking] = useState(false);
  const [completeOrder, { isLoading: isCompleting }] =
    useCompleteOrderMutation();


  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const order = data?.data;

  if (!order && !isLoading) return null;

  const orderDetail = [
    { label: "Nomor Resi", value: order?.trackingNumber || "-" },
    {
      label: "Nama Penerima",
      value: order?.shippingDetails?.recipientName || "-",
    },
    {
      label: "Nomor Telepon",
      value: order?.shippingDetails?.phoneNumber || "-",
    },
    {
      label: "Alamat",
      value: order?.shippingAddress || "-",
    },
    { label: "Kode Pos", value: order?.shippingPostCode || "-" },
  ];

  const handleCompleteOrder = async () => {
    const toastId = toaster.loading({
      title: "Mengonfirmasi pesanan...",
      duration: 4000,
    });

    try {
      await completeOrder(order?.id).unwrap();

      toaster.success({
        title: "Pesanan berhasil dikonfirmasi",
      });

      onClose(); // Optional: tutup modal setelah berhasil
    } catch (err) {
      toaster.error({
        title: "Gagal mengonfirmasi pesanan",
        description: err?.data?.errors || "Terjadi kesalahan",
      });
    } finally {
      toaster.dismiss(toastId);
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
            <Dialog.Header mb={4} padding={0} justifyContent="space-between">
              <Text
                fontSize={{ base: "20px", lg: "24px" }}
                fontWeight="bold"
                color="black"
                lineHeight={1}
              >
                {showTracking ? "Lacak Pengiriman" : "Detail Pesanan"}
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
              {showTracking ? (
                <TrackingOrder orderId={order?.id} />
              ) : (
                <>
                  {/* Step Progress */}
                  <Box w="full">
                    <StepProgressCustom
                      activeStep={2}
                      createdAt={order?.createdAt}
                      paidAt={order?.paidAt}
                      shippedAt={order?.shippedAt}
                      completedAt={order?.timestamps?.completedAt}
                    />
                  </Box>

                  {/* Detail Pengiriman */}
                  <Box w="full">
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="semibold"
                      color="black"
                      lineHeight={1}
                    >
                      Detail Pengiriman
                    </Text>
                    <DataList.Root
                      orientation="horizontal"
                      gap={3}
                      marginTop={6}
                    >
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

                  {/* Detail Produk */}
                  <Box w="full">
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="semibold"
                      color="black"
                      lineHeight={1}
                      marginBottom={6}
                    >
                      Detail Produk
                    </Text>
                    <ProdukItem items={order?.items || []} />
                  </Box>
                </>
              )}

              {/* Footer */}
              <Flex w="full" justifyContent="end">
                <HStack spacing={3}>
                  <Button
                    size="sm"
                    bg="orange.500"
                    color="white"
                    rounded="xl"
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.600" }}
                    onClick={() => setShowTracking(!showTracking)}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      {showTracking ? "Kembali" : "Lacak Pesanan"}
                    </Text>
                  </Button>

                  {!showTracking && (
                    <Button
                      size="sm"
                      bg="orange.500"
                      color="white"
                      rounded="xl"
                      px={5}
                      py={4}
                      _hover={{ bg: "orange.600" }}
                      isLoading={isCompleting}
                      onClick={handleCompleteOrder}
                    >
                      <Text lineHeight="1" whiteSpace="nowrap">
                        Pesanan Diterima
                      </Text>
                    </Button>
                  )}
                </HStack>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ModalOrderDetailShipped;
