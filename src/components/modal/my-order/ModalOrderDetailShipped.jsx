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

const ModalOrderDetailShipped = ({ isOpen, onClose }) => {
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
                <Dialog.CloseTrigger asChild>
                  <Box cursor="pointer">
                    <CloseSquare size="32" color="#828282" />
                  </Box>
                </Dialog.CloseTrigger>
              </Box>
            </Dialog.Header>

            <Dialog.Body as={VStack} align="stretch" gap={6} padding={0}>
              {/* Step Progress */}
              <Box w="full">
                <StepProgressCustom activeStep={0} />
              </Box>

              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "20px" }}
                  fontWeight="bold"
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
                  fontSize={{ base: "16px", lg: "20px" }}
                  fontWeight="bold"
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
                    bg={"orange.500"}
                    color={"white"}
                    rounded={"xl"}
                    px={5}
                    py={4}
                    _hover={{ bg: "orange.600" }}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Lacak Pesanan
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
                      Pesanan Diterima
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

export default ModalOrderDetailShipped;
