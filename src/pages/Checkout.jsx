import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Navbar from "../components/navigation/Navbar";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import Footer from "../components/sections/Footer";
import CheckoutItem from "../components/card/CheckoutItem";
import { User } from "react-iconly";
import { PhoneCall, Signpost, City, MapTrifold } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Toaster, toaster } from "../components/ui/toaster";

export default function Checkout() {
  const { state: selectedItems = [] } = useLocation();

  const [postalCode, setPostalCode] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const price = item?.product?.price ?? 0;
      const qty = item?.quantity ?? 0;
      return sum + price * qty;
    }, 0);
  }, [selectedItems]);

  const totalWeight = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const weight = item.product?.weight ?? 0;
      const qty = item.quantity ?? 0;
      return sum + weight * qty;
    }, 0);
  }, [selectedItems]);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        if (!postalCode || postalCode.length < 5) return;

        const resDest = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/shipping/destinations?keyword=${postalCode}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const destData = await resDest.json();
        const destId = destData?.data?.[0]?.id;
        if (!destId) return;
        setDestinationId(destId);

        const resShip = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/shipping/options?shipper_destination_id=72910&receiver_destination_id=${destId}&weight=${totalWeight}&item_value=${subtotal}&cod=no`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const shipData = await resShip.json();
        const jne = shipData?.data?.find((s) => s.shipping_name === "JNE");

        if (jne) {
          setShippingCost(jne.shipping_cost);
        }
      } catch (err) {
        console.error("Gagal fetch ongkir:", err);
      }
    };

    fetchShipping();
  }, [postalCode, totalWeight, subtotal]);
 
  const handleCheckout = async () => {
    const payload = {
      recipientName: document.getElementById("nama-penerima")?.value || "",
      phoneNumber: document.getElementById("nomor-telepon")?.value || "",
      shippingAddress: document.getElementById("alamat-lengkap")?.value || "",
      shippingCity: document.getElementById("kota")?.value || "",
      shippingProvince: document.getElementById("provinsi")?.value || "",
      shippingPostCode: postalCode,
      destinationId: String(destinationId), // dipastikan string
      shippingService: "REG23",
      courier: "JNE",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        const paymentUrl = result?.data?.paymentUrl;
        if (paymentUrl) {
          toaster.success({
            title: "Checkout Berhasil",
            description: "Kamu akan diarahkan ke halaman pembayaran.",
          });
          window.open(paymentUrl, "_blank"); 
        } else {
          toaster.error({
            title: "URL Pembayaran Tidak Ditemukan",
          });
        }
      } else {
        toaster.error({
          title: "Checkout Gagal",
          description: result?.errors || "Terjadi kesalahan saat checkout.",
        });
      }
    } catch (error) {
      toaster.error({
        title: "Checkout Gagal",
        description: error?.message || "Terjadi kesalahan jaringan.",
      });
    }
  };
   

  return (
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
          Checkout
        </Text>
        <Grid
          className="grid lg:grid-cols-2 sm:grid-rows-1"
          marginTop={{ base: "16px", lg: "24px" }}
          marginBottom={{ base: "24px", lg: "52px" }}
          paddingX={{ base: "12px", lg: "32px" }}
          gap={{ base: "12px", lg: "24px" }}
        >
          <GridItem colSpan={1} className="flex flex-col">
            <Box
              bg="white"
              borderRadius="xl"
              padding={6}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Text
                fontSize={{ base: "16px", lg: "20px" }}
                fontWeight="semibold"
                color="black"
              >
                Detail Pengiriman
              </Text>
              <VStack align="start" gap={4} w="full" marginTop="24px">
                <InputWithLogo
                  id="nama-penerima"
                  label="Nama Penerima"
                  type="text"
                  icon={User}
                />
                <InputWithLogo
                  id="nomor-telepon"
                  label="Nomor Telepon"
                  type="tel"
                  icon={PhoneCall}
                />
                <Textarea
                  id="alamat-lengkap"
                  placeholder="Alamat Penerima"
                  color="black"
                  fontSize={{ base: "12px", lg: "16px" }}
                  borderColor="gray.300"
                  height="96px"
                />
                <InputWithLogo
                  id="kota"
                  label="Kota"
                  type="text"
                  icon={City}
                />
                <InputWithLogo
                  id="provinsi"
                  label="Provinsi"
                  type="text"
                  icon={MapTrifold}
                />
                <InputWithLogo
                  id="kode-pos"
                  label="Kode Pos"
                  type="tel"
                  icon={Signpost}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </VStack>
            </Box>
          </GridItem>

          <GridItem colSpan={1} position="sticky">
            <Box
              bg="white"
              borderRadius="xl"
              padding={6}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Text
                fontSize={{ base: "16px", lg: "20px" }}
                fontWeight="semibold"
                color="black"
              >
                Ringkasan Belanja
              </Text>
              <Box flex="1" height="1px" bg="gray.200" marginTop="24px" />
              <VStack w="full" marginTop="8px">
                {selectedItems.map((item) => (
                  <CheckoutItem
                    key={item.productId}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))}
              </VStack>
              <Flex justifyContent="space-between" marginTop="24px">
                <Text fontSize="14px" fontWeight="semibold" color="gray.400">
                  Subtotal
                </Text>
                <Text
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight="bold"
                  color="black"
                >
                  Rp {subtotal.toLocaleString("id-ID")}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" marginTop="12px">
                <Text fontSize="14px" fontWeight="semibold" color="gray.400">
                  Pengiriman
                </Text>
                <Text
                  fontSize={{ base: "12px", lg: "16px" }}
                  fontWeight="bold"
                  color="black"
                >
                  Rp {shippingCost.toLocaleString("id-ID")}
                </Text>
              </Flex>
              <Box flex="1" height="1px" bg="gray.200" marginTop="24px" />
              <Flex justifyContent="space-between" marginTop="24px">
                <Text fontSize="14px" fontWeight="semibold" color="gray.400">
                  Total Tagihan
                </Text>
                <Text
                  fontSize={{ base: "16px", lg: "20px" }}
                  fontWeight="bold"
                  color="orange.500"
                >
                  Rp {(subtotal + shippingCost).toLocaleString("id-ID")}
                </Text>
              </Flex>
              <Button
                marginTop="24px"
                size="sm"
                bg="orange.500"
                color="white"
                rounded="xl"
                w="full"
                py={5}
                _hover={{ bg: "orange.600" }}
                onClick={handleCheckout}
              >
                <Text lineHeight="1" whiteSpace="nowrap">
                  Buat Pesanan
                </Text>
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Footer display={{ base: "none", lg: "block" }} />
    </div>
  );
}
