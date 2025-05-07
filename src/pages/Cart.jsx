import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/sections/Footer";
import CartItem from "../components/card/CartItem";
import { Toaster } from "../components/ui/toaster";
import { useGetCartQuery, useDeleteCartItemMutation } from "../store/store";
import CartSkeleton from "../components/skeleton/CartSkeleton";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { data, isLoading, refetch } = useGetCartQuery();
  const cartItems = useMemo(() => data?.data?.items || [], [data?.data?.items]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const initQuantities = {};
    cartItems.forEach((item) => {
      initQuantities[item.id] = item.quantity;
    });
    setQuantities(initQuantities);
  }, [cartItems]);

  if (isLoading) return <CartSkeleton />;

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleQuantityChange = (itemId, newQty) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQty,
    }));
  };

  const handleDelete = (itemId) => {
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    setQuantities((prev) => {
      const c = { ...prev };
      delete c[itemId];
      return c;
    });
    refetch();
  };

  const totalHarga = selectedItems.reduce((sum, id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return sum;
    const qty = quantities[id] || item.quantity;
    return sum + item.product.price * qty;
  }, 0);

  const handleCheckout = () => {
    const selectedData = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => ({
        productId: item.productId,
        quantity: quantities[item.id] || item.quantity,
        product: item.product,
      }));

    navigate("/checkout", { state: selectedData });
  };

  return (
    <>
      <div
        className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <Container paddingX={{ base: "0px", lg: "80px" }}>
          <Text
            marginTop={{ base: "72px", lg: "89px" }}
            fontSize={{ base: "24px", lg: "32px" }}
            fontWeight="bold"
            color="black"
            paddingX={{ base: "16px", lg: "32px" }}
          >
            Keranjang
          </Text>
          <Grid
            className="grid lg:grid-cols-3 sm:grid-rows-1"
            marginTop={{ base: "16px", lg: "24px" }}
            marginBottom={{ base: "160px", lg: "52px" }}
            paddingX={{ base: "12px", lg: "32px" }}
          >
            <GridItem
              colSpan={2}
              className="flex flex-col"
              gap={{ base: "8px", lg: "12px" }}
            >
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isChecked={selectedItems.includes(item.id)}
                  onCheck={toggleItem}
                  onDelete={() => {}}
                  onQuantityChange={handleQuantityChange}
                  onDelete={handleDelete}
                />
              ))}
            </GridItem>
            <GridItem
              colSpan={1}
              display={{ base: "none", lg: "block" }}
              position="sticky"
            >
              <Box
                bg="white"
                borderRadius="xl"
                padding={4}
                boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
              >
                <Text
                  textAlign="start"
                  fontSize="16px"
                  fontWeight="bold"
                  color="black"
                  lineHeight={"1.2"}
                >
                  Ringkasan Belanja
                </Text>
                <Flex justifyContent="space-between" marginTop={"16px"}>
                  <Text
                    textAlign="start"
                    fontSize="14px"
                    fontWeight="semibold"
                    color="gray.400"
                    lineHeight={"1.2"}
                  >
                    Total
                  </Text>
                  <Text
                    textAlign="end"
                    fontSize={{ base: "12px", lg: "16px" }}
                    fontWeight="bold"
                    color="orange.500"
                    lineHeight={"1.2"}
                  >
                    Rp {totalHarga.toLocaleString("id-ID")}
                  </Text>
                </Flex>
                <Box flex="1" height="1px" bg="gray.200" marginTop={"16px"} />
                <Button
                  marginTop={"16px"}
                  size={"sm"}
                  bg={"orange.500"}
                  color={"white"}
                  rounded={"xl"}
                  w={"full"}
                  py={5}
                  _hover={{ bg: "orange.600" }}
                  onClick={handleCheckout}
                >
                  <Text lineHeight="1" whiteSpace="nowrap">
                    Checkout
                  </Text>
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Container>
        <Footer display={{ base: "none", lg: "block" }} />
        <Box
          display={{ base: "block", lg: "none" }}
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          bg="white"
          borderTop="1px solid #E2E8F0"
          padding={4}
          zIndex="10"
          boxShadow="0px -4px 30px rgba(0, 0, 0, 0.05)"
        >
          <Text
            textAlign="start"
            fontSize="16px"
            fontWeight="bold"
            color="black"
            lineHeight={"1.2"}
          >
            Ringkasan Belanja
          </Text>
          <Flex justifyContent="space-between" marginTop={"16px"}>
            <Text
              textAlign="start"
              fontSize="14px"
              fontWeight="semibold"
              color="gray.400"
              lineHeight={"1.2"}
            >
              Total
            </Text>
            <Text
              textAlign="end"
              fontSize="16px"
              fontWeight="bold"
              color="orange.500"
              lineHeight={"1.2"}
            >
              Rp {totalHarga.toLocaleString("id-ID")}
            </Text>
          </Flex>
          <Button
            marginTop={"16px"}
            size={"sm"}
            bg={"orange.500"}
            color={"white"}
            rounded={"xl"}
            w={"full"}
            py={5}
            _hover={{ bg: "orange.600" }}
            onClick={handleCheckout}
          >
            <Text lineHeight="1" whiteSpace="nowrap">
              Checkout
            </Text>
          </Button>
        </Box>
      </div>
      <Toaster />
    </>
  );
}
