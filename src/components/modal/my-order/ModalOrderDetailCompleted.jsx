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
import ProductReview from "../../sections/ProductReview";
import {
  useGetOrderByIdQuery,
  useSubmitProductReviewMutation,
} from "../../../store/store";
import { useEffect, useState } from "react";
import { toaster } from "../../ui/toaster";

const ModalOrderDetailCompleted = ({ isOpen, onClose, orderId }) => {
  const { data, isLoading } = useGetOrderByIdQuery(orderId);
  const [postReview, { isLoading: isPosting }] =
    useSubmitProductReviewMutation();
  const order = data?.data;
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    if (Array.isArray(order?.items)) {
      const initialReview = order.items.map((item) => ({
        productId: item.id, 
        rating: 0,
        comment: "",
      }));
      setReviewList(initialReview);
    }
  }, [order]);
  
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

  const handleSubmitReview = async () => {
    const toastId = toaster.loading({
      title: "Mengirim penilaian...",
    });

    try {
      const formattedPayload = reviewList.map((review) => ({
        productId: review.productId,
        rating: review.rating,
        comment: review.comment,
      }));

      if (formattedPayload.some((item) => !item.productId)) {
        toaster.error({
          title: "Gagal mengirim ulasan",
          description: "ID produk tidak ditemukan.",
        });
        toaster.dismiss(toastId);
        return;
      }

      const finalPayload =
        formattedPayload.length === 1 ? formattedPayload[0] : formattedPayload;

      await postReview({ orderId, payload: finalPayload }).unwrap();

      toaster.success({ title: "Berhasil mengirim penilaian" });
      setIsReviewing(false);
    } catch (err) {
      toaster.error({
        title: "Gagal mengirim penilaian",
        description: err?.data?.errors || "Terjadi kesalahan",
      });
    } finally {
      toaster.dismiss(toastId);
    }
  }; 
  
  const handleChange = (index, key, value) => {
    const updated = [...reviewList];
    updated[index][key] = value;
    setReviewList(updated);
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
              >
                {isReviewing ? "Ulas Produk" : "Detail Pesanan"}
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
              {!isReviewing && (
                <Box w="full">
                  <StepProgressCustom
                    activeStep={3}
                    createdAt={order?.createdAt}
                    paidAt={order?.paidAt}
                    shippedAt={order?.shippedAt}
                    completedAt={order?.completedAt}
                  />
                </Box>
              )}

              {!isReviewing ? (
                <>
                  <Box w="full">
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="semibold"
                      color="black"
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

                  <Box w="full">
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      fontWeight="semibold"
                      color="black"
                      marginBottom={6}
                    >
                      Detail Produk
                    </Text>
                    <ProdukItem items={order?.items || []} />
                  </Box>
                </>
              ) : (
                <ProductReview
                  items={order?.items || []}
                  reviewList={reviewList}
                  onChange={handleChange}
                />
              )}

              <Flex w="full" justifyContent="end">
                <HStack spacing={3}>
                  {isReviewing && (
                    <Button
                      size="sm"
                      variant="outline"
                      color="orange.500"
                      borderColor="orange.500"
                      rounded="xl"
                      px={5}
                      py={4}
                      _hover={{ bg: "orange.100" }}
                      onClick={() => setIsReviewing(false)}
                    >
                      <Text lineHeight="1" whiteSpace="nowrap">
                        Kembali
                      </Text>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    bg="orange.500"
                    color="white"
                    rounded="xl"
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.600" }}
                    isLoading={isPosting}
                    onClick={() =>
                      isReviewing ? handleSubmitReview() : setIsReviewing(true)
                    }
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      {isReviewing ? "Kirim Penilaian" : "Beri Penilaian"}
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

export default ModalOrderDetailCompleted;
