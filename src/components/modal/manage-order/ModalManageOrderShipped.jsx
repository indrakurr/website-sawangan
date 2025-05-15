import { useEffect, useState } from "react";
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
  Menu,
} from "@chakra-ui/react";
import {
  CloseSquare,
  Box1,
  ArrowDown2,
  Profile,
} from "iconsax-react";
import {
  ClipboardText,
  PhoneCall,
  MapTrifold,
  Signpost,
  Receipt,
} from "@phosphor-icons/react";
import ProdukItem from "../../card/CartModal";

const ModalManageOrderShipped = ({ isOpen, onClose, order }) => {
  const [selected, setSelected] = useState("Belum Bayar");

  useEffect(() => {
    if (order?.status) {
      const statusMap = {
        PENDING: "Belum Bayar",
        PACKAGED: "Dikemas",
        SHIPPED: "Dikirim",
      };
      setSelected(statusMap[order.status] || order.status);
    }
  }, [order]);

  if (!order) return null;

  const orderDetail = [
    {
      label: "Nama Penerima",
      value: order?.shippingDetails?.recipientName || "-",
      icon: <Profile size={20} color="#949494" />,
    },
    {
      label: "Nomor Telepon",
      value: order?.shippingDetails?.phoneNumber || "-",
      icon: <PhoneCall size={20} />,
    },
    {
      label: "Alamat",
      value: order?.shippingDetails?.address || "-",
      icon: <MapTrifold size={20} />,
    },
    {
      label: "Kode Pos",
      value: order?.shippingDetails?.postalCode || "-",
      icon: <Signpost size={20} />,
    },
    { label: "Nomor Resi", value: order?.trackingNumber || "-", icon: <Receipt size={20} /> },
  ];

  const isPaid = order?.paymentStatus === "PAID";

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
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight="semibold"
                color="black"
                lineHeight={1}
              >
                ID Pesanan:{" "}
                <Box as="span" color="orange.500">
                  {order?.id || "-"}
                </Box>
              </Text>
              <Box
                position="absolute"
                top={3}
                right={3}
                cursor="pointer"
                onClick={onClose}
              >
                <CloseSquare size="32" color="#828282" />
              </Box>
            </Dialog.Header>

            <Dialog.Body as={VStack} align="stretch" gap={6} padding={0}>
              <Box w="full">
                <Text fontSize="lg" fontWeight="semibold" color="black">
                  Detail Pesanan
                </Text>
                <DataList.Root orientation="horizontal" gap={6} mt={6}>
                  {orderDetail.map((spec) => (
                    <DataList.Item key={spec.label}>
                      <DataList.ItemLabel fontSize="sm" width="1/4">
                        <HStack spacing={2}>
                          {spec.icon}
                          <Text>{spec.label}</Text>
                        </HStack>
                      </DataList.ItemLabel>
                      <DataList.ItemValue
                        color="black"
                        fontSize="sm"
                        width="3/4"
                      >
                        {spec.value}
                      </DataList.ItemValue>
                    </DataList.Item>
                  ))}

                  <DataList.Item>
                    <DataList.ItemLabel fontSize="sm" width="1/4">
                      <HStack spacing={2} alignItems="center">
                        <Box1 size={20} color="#949494" />
                        <Text>Status Pesanan</Text>
                      </HStack>
                    </DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Menu.Root>
                        <Menu.Trigger
                          as={Button}
                          variant="outline"
                          borderRadius="lg"
                          borderColor="gray.300"
                          _hover={{ bg: "gray.50" }}
                          _open={{ bg: "white" }}
                          px="4"
                          py="6"
                          width="1/3"
                          justifyContent="space-between"
                          isDisabled={!isPaid}
                        >
                          <HStack spacing={2}>
                            <ClipboardText size={20} />
                            <Text color="black" fontWeight="normal">
                              {selected}
                            </Text>
                          </HStack>
                          <ArrowDown2 size={20} color="#949494" />
                        </Menu.Trigger>
                      </Menu.Root>
                    </DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Box>

              <Box w="full">
                <Text fontSize="lg" fontWeight="semibold" color="black">
                  Detail Produk
                </Text>
                <ProdukItem items={order?.items || []} />
              </Box>

              <Flex w="full" justifyContent="end">
                <HStack spacing={3}>
                  <Button
                    size="sm"
                    variant="outline"
                    color="orange.500"
                    borderColor="orange.500"
                    rounded="xl"
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.500", color: "white" }}
                    onClick={onClose}
                  >
                    Kembali
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

export default ModalManageOrderShipped;
