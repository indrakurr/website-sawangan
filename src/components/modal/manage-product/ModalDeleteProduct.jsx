import {
  Button,
  Dialog,
  Portal,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { WarningCircle } from "@phosphor-icons/react";
import { useDeleteProductMutation } from "../../../store/store";
import { toaster } from "../../ui/toaster";

const ModalDeleteProduct = ({
  isOpen,
  onClose,
  productId,
  onSuccess,
  refetch,
}) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    const toastId = toaster.loading({
      title: "Menyimpan perubahan...",
      duration: 4000,
    });
    try {
      await deleteProduct(productId).unwrap();
      onClose();
      toaster.success({
        title: "Produk dihapus",
        description: "Produk berhasil dihapus dari sistem",
      });
      refetch();
      if (onSuccess) onSuccess();
    } catch (err) {
      toaster.error({
        title: "Gagal menghapus",
        description: err?.data?.errors || "Terjadi kesalahan saat menghapus",
      });
    } finally {
      toaster.dismiss(toastId);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(8px)" bg="rgba(0, 0, 0, 0.4)" />
        <Dialog.Positioner
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
        >
          <Dialog.Content
            borderRadius="2xl"
            bg="white"
            w="md"
            p={{ base: 4, lg: 6 }}
            gap={{ base: 4, lg: 6 }}
            boxShadow="none"
          >
            <Dialog.Body as={VStack} align="stretch" gap={6} padding={0}>
              <WarningCircle size={80} color="red" />
              <Text
                fontSize="24px"
                textAlign={"center"}
                fontWeight="medium"
                color="black"
                lineHeight={1.2}
              >
                Anda yakin ingin menghapus Produk ini?
              </Text>
              <Text
                fontSize="16px"
                fontWeight="semibold"
                color="#828282"
                lineHeight={1.2}
              >
                Data yang dihapus tidak dapat dipulihkan
              </Text>
              <Flex w="full" justifyContent="center">
                <HStack spacing={3}>
                  <Button
                    size={"sm"}
                    bg={"#828282"}
                    color={"white"}
                    rounded={"xl"}
                    px={5}
                    py={4}
                    _hover={{ bg: "gray.500", color: "white" }}
                    onClick={onClose}
                    isDisabled={isLoading}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Batal
                    </Text>
                  </Button>
                  <Button
                    size={"sm"}
                    bg={"red.500"}
                    color={"white"}
                    rounded={"xl"}
                    px={5}
                    py={4}
                    _hover={{ bg: "red.600" }}
                    onClick={handleDelete}
                    isLoading={isLoading}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Hapus
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

export default ModalDeleteProduct;
