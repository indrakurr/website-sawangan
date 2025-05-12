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
import { CloseSquare, Box1, ArrowDown2, Profile, MoneyTick } from "iconsax-react";
import {
  ClipboardText,
  PhoneCall,
  MapTrifold,
  Signpost,
} from "@phosphor-icons/react";
import ProdukItem from "../../card/CartModal";

const ModalManageOrderPending = ({ isOpen, onClose, order }) => {
  const [selected, setSelected] = useState("Belum Bayar");

  // Mapping status awal dari API ke UI
  useEffect(() => {
    if (order?.status) {
      const statusMap = {
        PENDING: "Belum Bayar",
        PACKAGED: "Dikemas",
        SHIPPED: "Dikirim",
        COMPLETED: "Diterima",
        CANCELLED: "Dibatalkan",
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
  ];

  const statusList = [
    "Belum Bayar",
    "Dikemas",
    "Dikirim",
    "Diterima",
    "Dibatalkan",
  ];

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
              {/* Detail Pesanan */}
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
                        <MoneyTick size={20} color="#949494" />
                        <Text>Status Transaksi</Text>
                      </HStack>
                    </DataList.ItemLabel>
                    <DataList.ItemValue>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        px={3}
                        py={1.5}
                        borderRadius="lg"
                        display="inline-block"
                        bg={
                          order?.paymentStatus === "PAID"
                            ? "green.100"
                            : "red.100"
                        }
                        color={
                          order?.paymentStatus === "PAID"
                            ? "green.600"
                            : "red.600"
                        }
                      >
                        {order?.paymentStatus === "PAID"
                          ? "Pembayaran Diterima"
                          : "Menunggu Pembayaran"}
                      </Text>
                    </DataList.ItemValue>
                  </DataList.Item>

                  {/* Dropdown status */}
                  <DataList.Item>
                    <DataList.ItemLabel fontSize="sm" width="1/4">
                      <HStack spacing={2}>
                        <Box1 size={20} color="#949494" />
                        <Text>Ubah Status Pesanan</Text>
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
                        >
                          <HStack spacing={2}>
                            <ClipboardText size={20} />
                            <Text color="black" fontWeight="normal">
                              {selected}
                            </Text>
                          </HStack>
                          <ArrowDown2 size={20} color="#949494" />
                        </Menu.Trigger>

                        <Menu.Positioner>
                          <Menu.Content
                            borderRadius="md"
                            boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                            bg="white"
                          >
                            {statusList.map((status) => (
                              <Menu.Item
                                key={status}
                                onClick={() => setSelected(status)}
                                color="black"
                                _focus={{ bg: "gray.100" }}
                                _hover={{ bg: "gray.100" }}
                                fontWeight={
                                  selected === status ? "semibold" : "normal"
                                }
                              >
                                {status}
                              </Menu.Item>
                            ))}
                          </Menu.Content>
                        </Menu.Positioner>
                      </Menu.Root>
                    </DataList.ItemValue>
                  </DataList.Item>
                </DataList.Root>
              </Box>

              {/* Produk */}
              <Box w="full">
                <Text fontSize="lg" fontWeight="semibold" color="black">
                  Detail Produk
                </Text>
                <ProdukItem items={order?.items || []} />
              </Box>

              {/* Footer */}
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
                  <Button
                    size="sm"
                    bg="orange.500"
                    color="white"
                    rounded="xl"
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.600" }}
                  >
                    Simpan
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

export default ModalManageOrderPending;
