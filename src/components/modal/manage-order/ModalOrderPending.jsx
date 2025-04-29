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

const ModalOrderPending = ({ isOpen, onClose }) => {
  const orderDetail = [
    { label: "Nama Penerima", value: ": Lorem Ipsum" },
    { label: "Nomor Telepon", value: ": 08123456789" },
    {
      label: "Alamat",
      value:
        ": Lorem ipsum dolor sit amet, consectetur adipiscing elit Aenean scelerisque, mauris viverra hendrerit vestibulum tellus accumsan quam, non congue dolor leo vitae ipsum",
    },
    { label: "Kode Pos", value: ": 123456" },
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
            <Dialog.Header mb={4} padding={0} justifyContent={"space-between"}>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight="semibold"
                color="orange.500"
                lineHeight={1}
              >
                ID Pesanan: 2312312948
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
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="semibold"
                  color="black"
                  lineHeight={1}
                >
                  Detail Pesanan
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
                <ProdukItem />
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
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Batalkan Pesanan
                    </Text>
                  </Button>
                  <Button
                    size={"sm"}
                    bg={"orange.500"}
                    color={"white"}
                    rounded={"xl"}
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.600" }}
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

export default ModalOrderPending;
