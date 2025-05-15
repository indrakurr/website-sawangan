import { Box, Card, Image, Text, HStack, Button, useBreakpointValue } from "@chakra-ui/react";
import { ShoppingCart, Star } from "@phosphor-icons/react";
import { toaster } from "../ui/toaster";
import { Link } from "react-router-dom";
import {
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useGetCartQuery,
} from "../../store/store";

export default function CardProduk({ product }) {
  const [addToCart, { isLoading: isPosting }] = useAddToCartMutation();
  const [patchCartItem, { isLoading: isPatching }] =
    useUpdateCartItemMutation();
  const { data: cartData } = useGetCartQuery();

  const starSize = useBreakpointValue({ base: 12, lg: 16 });
  const iconSize = useBreakpointValue({ base: 16, lg: 20 });

  const isLoading = isPosting || isPatching;

  if (!product) return null;
  const { id, name, imageUrl, ratingAvg = 0, price } = product;

  const handleAddToCart = async (e) => {
    e.preventDefault();

    const existingItem = cartData?.data?.items?.find(
      (item) => item.productId === id
    );
    const toastId = toaster.loading({
      title: "Menambahkan produk ke keranjang...",
      duration: 4000,
    });
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
    } finally {
      toaster.dismiss(toastId);
    }
  };

  return (
    <Link to={`/products/${id}`}>
      <Card.Root
        overflow="hidden"
        bg="white"
        borderStyle="solid"
        borderColor="gray.100"
        borderRadius="xl"
        boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
      >
        <Box w="100%" h={{ base: "144px", lg: "192px" }} overflow="hidden">
          <Image
            w="100%"
            h="100%"
            src={imageUrl}
            alt={name}
            objectFit="cover"
          />
        </Box>
        <Card.Body gap={2} px={{ base: 3, lg: 4 }} py={{ base: 2, lg: 3 }}>
          <Text
            fontSize={{ base: "sm", lg: "md" }}
            fontWeight="semibold"
            color="black"
            lineHeight="1.4"
            maxW="100%"
            height={{ base: "36px", lg: "50px" }}
            display="-webkit-box"
            overflow="hidden"
            textOverflow="ellipsis"
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {name}
          </Text>

          <HStack gap="1px">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Star
                  key={i}
                  size={starSize}
                  color={i < Math.round(ratingAvg) ? "#FFA500" : "#ccc"}
                  weight="fill"
                />
              ))}
            <Text color="gray.800" fontSize={{ base: "xs", lg: "sm" }}>
              {ratingAvg.toFixed(1)}
            </Text>
          </HStack>

          <Text
            color="black"
            fontSize={{ base: "md", lg: "2xl" }}
            fontWeight="medium"
            letterSpacing="tight"
          >
            Rp {price.toLocaleString("id-ID")}
          </Text>
        </Card.Body>
        <Card.Footer
          className="flex justify-end"
          px={{ base: 3, lg: 4 }}
          paddingBottom={{ base: 2, lg: 3 }}
        >
          <Box
            onClick={handleAddToCart}
            cursor="pointer"
            bg="orange.500"
            rounded="full"
            p={{ base: 2, lg: 2.5 }}
            _hover={{ bg: "orange.600" }}
            transition="all 0.2s"
          >
            <ShoppingCart
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
              }}
              color="white"
            />
          </Box>
        </Card.Footer>
      </Card.Root>
    </Link>
  );
}
