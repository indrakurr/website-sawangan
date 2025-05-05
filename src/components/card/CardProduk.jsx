import { Card, Image, Text, HStack, Button } from "@chakra-ui/react";
import { ShoppingCart, Star } from "@phosphor-icons/react";
import { toaster } from "../ui/toaster";
import { Link } from "react-router-dom";
import {
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useGetCartQuery,
} from "../../store/store";

export default function CardProduk({product}) {
const [addToCart, { isLoading: isPosting }] = useAddToCartMutation();
const [patchCartItem, { isLoading: isPatching }] = useUpdateCartItemMutation();
const { data: cartData } = useGetCartQuery();

const isLoading = isPosting || isPatching;

if (!product) return null;
const { id, name, imageUrl, ratingAvg = 0, price } = product;

const handleAddToCart = async (e) => {
  e.preventDefault();

  const existingItem = cartData?.data?.items?.find(
    (item) => item.productId === id
  );

  try {
    if (existingItem) {
      const newQty = existingItem.quantity + 1;
      await patchCartItem({ productId: id, quantity: newQty }).unwrap();
    } else {
      await addToCart({ productId: id, quantity: 1 }).unwrap();
    }

    toaster.success({
      title: "Berhasil",
      description: existingItem
        ? "Jumlah produk diperbarui di keranjang"
        : "Produk ditambahkan ke keranjang",
    });
  } catch (err) {
    toaster.error({
      title: "Gagal",
      description: err?.data?.errors || "Terjadi kesalahan",
    });
  }
};
  
  return (
    <Link to={`/products/${id}`}>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        bg="white"
        borderStyle={"solid"}
        borderColor={"gray.100"}
        borderRadius={16}
        boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
      >
        <Image className="w-64 h-48" maxH={192} src={imageUrl} alt={name} />
        <Card.Body gap="2">
          <Card.Title textStyle={"md"} color="black" maxW={208}>
            {name}
          </Card.Title>
          <HStack style={{ gap: "1px" }}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={i < Math.round(ratingAvg) ? "#FFA500" : "#ccc"}
                  weight="fill"
                />
              ))}
            <Text color={"gray.800"} textStyle={"xs"}>
              {ratingAvg.toFixed(1)}
            </Text>
          </HStack>
          <Text
            color="black"
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
          >
            Rp {price.toLocaleString("id-ID")}
          </Text>
        </Card.Body>
        <Card.Footer className="flex justify-end">
          <Button
            size={"sm"}
            bg={"orange.500"}
            rounded={"xl"}
            px={4}
            py={4}
            _hover={{ bg: "orange.600" }}
            border={"none"}
            onClick={handleAddToCart}
            isLoading={isLoading}
          >
            <ShoppingCart
              style={{ width: "24px", height: "24px" }}
              color="white"
            />
          </Button>
        </Card.Footer>
      </Card.Root>
    </Link>
  );
}
