import {
  Button,
  Box,
  Checkbox,
  Flex,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import CounterCart from "../counter/CounterCart";
import { toaster } from "../ui/toaster";
import { Trash } from "iconsax-react";
import {
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "../../store/store";

export default function CartItem({
  item,
  isChecked,
  onCheck,
  onQuantityChange,
  onDelete,
}) {
  const { product } = item;
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleQuantityChange = async (newQty) => {
    const toastId = toaster.loading({
      title: "Menyimpan perubahan...",
      duration: 4000,
    });
    try {
      await updateCartItem({
        productId: item.productId,
        quantity: newQty,
      }).unwrap();
      onQuantityChange(item.id, newQty);
      toaster.success({
        title: "Jumlah produk berhasil diubah",
      });
    } catch (err) {
      console.error(err);
      toaster.error({ title: "Gagal mengubah jumlah produk" });
    } finally {
      toaster.dismiss(toastId);
    }
  };

  const handleDeleteClick = async () => {
    const toastId = toaster.loading({
      title: "Menyimpan perubahan...",
      duration: 4000,
    });
    try {
      await deleteCartItem(item.productId).unwrap();
      onDelete(item.id);
      toaster.success({ title: "Produk berhasil dihapus dari keranjang" });
    } catch (err) {
      console.error(err);
      toaster.error({ title: "Gagal menghapus Produk" });
    } finally {
      toaster.dismiss(toastId);
    }
  };

  return (
    <Box
      w={{ base: "100%", lg: "800px" }}
      display="flex"
      alignItems={{ base: "start", lg: "center" }}
      justifyContent="start"
      gap={{ base: "12px", lg: "24px" }}
      p={4}
      borderRadius={{ base: "md", lg: "xl" }}
      bg="white"
      boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
    >
      <Checkbox.Root
        colorPalette="orange"
        variant="solid"
        checked={isChecked}
        onCheckedChange={() => onCheck(item.id)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control color="white" />
      </Checkbox.Root>
      <Image
        w={"80px"}
        h={"80px"}
        minW={"80px"}
        minH={"80px"}
        borderRadius="md"
        src={product.imageUrl}
        alt={product.name}
        objectFit="cover"
      />
      <Box w={"full"}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "4px", lg: "24px" }}
          marginBottom={"16px"}
        >
          <Text
            maxW="480px"
            maxH="40px"
            wordBreak="break-word"
            textAlign="start"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="regular"
            color="black"
            lineHeight={"1.2"}
          >
            {product.name}
          </Text>
          <Spacer />
          <Text
            textAlign="start"
            fontSize={{ base: "12px", lg: "16px" }}
            fontWeight="bold"
            color="black"
            lineHeight={"1"}
          >
            Rp {product.price.toLocaleString("id-ID")}
          </Text>
        </Flex>
        <Flex gap={"16px"} justifyContent={"end"}>
          <Button
            size={"sm"}
            bg="transparent"
            rounded={"xl"}
            px={0}
            py={0}
            border={"none"}
            onClick={handleDeleteClick}
          >
            <Trash style={{ width: "24px", height: "24px" }} color="black" />
          </Button>
          <CounterCart
            scale={0.8}
            fontSize="12px"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </Flex>
      </Box>
    </Box>
  );
}
