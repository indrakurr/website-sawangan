import {
  Button,
  Field,
  Fieldset,
  Dialog,
  Portal,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Grid,
  GridItem,
  Menu,
} from "@chakra-ui/react";
import { CloseSquare, Tag2 } from "iconsax-react";
import { InputWithLogo } from "../../inputs/InputWithLogo";
import { InputTextArea } from "../../inputs/InputTextArea";
import { InputWithElement } from "../../inputs/InputWithElement";
import { InputDateFormat } from "../../inputs/InputDateFormat";
import { ShoppingCart, Package } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { ImageField } from "../../inputs/ImageField";
import { Category2, ArrowDown2, WeightMeter, Tag } from "iconsax-react";
import { useAddProductMutation } from "../../../store/store";
import { toaster } from "../../ui/toaster";

const ModalAddProduct = ({ isOpen, onClose }) => {
  const { control, handleSubmit, register, reset } = useForm();
  const [addProduct] = useAddProductMutation();
  const imageRef = useRef();
  const handleImageRef = () => imageRef.current?.click();
  const kategoriList = ["Makanan", "Minuman", "Aksesoris"];
  const [selected, setSelected] = useState("Pilih Kategori");
  const [expiryDate, setExpiryDate] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data["nama-produk"]);
    formData.append("price", data["harga-produk"]);
    formData.append("description", data["deskripsi-produk"]);
    formData.append("category", selected);
    formData.append("weight", data["berat-produk"]);
    formData.append("stock", data["stok-produk"]);
    formData.append("expiryDate", formatToISODate(expiryDate));

    if (data.uploadImage && data.uploadImage[0] instanceof File) {
      formData.append("image", data.uploadImage[0]);
    }

    try {
      await addProduct(formData).unwrap();
      toaster.success({
        title: "Berhasil",
        description: "Produk berhasil ditambahkan",
      });
      onClose();
    } catch (err) {
      toaster.error({
        title: "Gagal",
        description:
          err?.data?.errors || "Terjadi kesalahan saat menambahkan produk",
      });
    }
  };


    const formatToISODate = (str) => {
      const [day, month, year] = str.split("/");
      return `${year}-${month}-${day}`;
    };

    useEffect(() => {
      if (isOpen) {
        reset();
        setSelected("Pilih Kategori"); 
        setExpiryDate("");
      }
    }, [isOpen, reset]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(8px)" bg="rgba(0, 0, 0, 0.4)" />
        <Dialog.Positioner padding={{ base: 3, lg: 0 }}>
          <Dialog.Content
            borderRadius="2xl"
            bg="white"
            maxW="4xl"
            w="full"
            p={{ base: 4, lg: 6 }}
            gap={{ base: 4, lg: 6 }}
            boxShadow="none"
          >
            <Dialog.Header padding={0} justifyContent={"space-between"}>
              <Text
                fontSize={{ base: "20px", lg: "24px" }}
                fontWeight="bold"
                color="black"
                lineHeight={1}
              >
                Tambah Produk
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
              <Grid templateColumns="repeat(3, 1fr)" gap={6} w={"full"}>
                <GridItem colSpan={1}>
                  <ImageField
                    control={control}
                    imageRef={imageRef}
                    handleImageRef={handleImageRef}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <VStack gap={6}>
                    <Flex gap={3} w={"full"}>
                      <InputWithLogo
                        w="2/3"
                        id="nama-produk"
                        label="Nama Produk"
                        type="text"
                        icon={ShoppingCart}
                        {...register("nama-produk", { required: true })}
                      />
                      <InputWithLogo
                        w="1/3"
                        id="harga-produk"
                        label="Harga Produk"
                        type="number"
                        icon={Tag2}
                        {...register("harga-produk", { required: true })}
                      />
                    </Flex>
                    <InputTextArea
                      label="Deskripsi Produk"
                      id="deskripsi-produk"
                      rows={5}
                      {...register("deskripsi-produk", { required: true })}
                    />
                    <Fieldset.Root>
                      <Fieldset.Legend color={"gray.500"} fontWeight={"bold"}>
                        Spesifikasi Produk
                      </Fieldset.Legend>
                      <Field.Root>
                        <Flex gap={3} w={"full"}>
                          <div className="w-1/2">
                            <Field.Label
                              color="gray.500"
                              fontSize="12px"
                              fontWeight="normal"
                              marginBottom={1}
                            >
                              Kategori Produk
                            </Field.Label>
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
                                w="full"
                                justifyContent="space-between"
                              >
                                <HStack spacing={2}>
                                  <Category2 size="20" color="#949494" />
                                  <Text color="gray.500" fontWeight="normal">
                                    {selected}
                                  </Text>
                                </HStack>
                                <ArrowDown2 size="20" color="#949494" />
                              </Menu.Trigger>

                              <Menu.Positioner>
                                <Menu.Content
                                  borderRadius="md"
                                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                                  bg="white"
                                >
                                  {kategoriList.map((kategori) => (
                                    <Menu.Item
                                      key={kategori}
                                      onClick={() => setSelected(kategori)}
                                      color="black"
                                      _focus={{ bg: "gray.100" }}
                                      _hover={{ bg: "gray.100" }}
                                      fontWeight={
                                        selected === kategori
                                          ? "semibold"
                                          : "normal"
                                      }
                                    >
                                      {kategori}
                                    </Menu.Item>
                                  ))}
                                </Menu.Content>
                              </Menu.Positioner>
                            </Menu.Root>
                          </div>
                          <div className="w-1/2">
                            <Field.Label
                              color="gray.500"
                              fontSize="12px"
                              fontWeight="normal"
                              marginBottom={1}
                            >
                              Berat Produk
                            </Field.Label>
                            <InputWithElement
                              startElement={
                                <WeightMeter size={20} color="#949494" />
                              }
                              endElement={<Text color={"gray.500"}>gram</Text>}
                              placeholder="Masukkan berat produk"
                              {...register("berat-produk", { required: true })}
                            />
                          </div>
                        </Flex>
                        <Flex gap={3} w={"full"} marginTop={3}>
                          <div className="w-1/2">
                            <Field.Label
                              color="gray.500"
                              fontSize="12px"
                              fontWeight="normal"
                              marginBottom={1}
                            >
                              Stok Produk
                            </Field.Label>
                            <InputWithElement
                              startElement={
                                <Package size={20} color="#949494" />
                              }
                              placeholder="Masukkan stok produk"
                              {...register("stok-produk", { required: true })}
                            />
                          </div>
                          <div className="w-1/2">
                            <Field.Label
                              color="gray.500"
                              fontSize="12px"
                              fontWeight="normal"
                              marginBottom={1}
                            >
                              Tanggal Kadaluarsa
                            </Field.Label>
                            <InputDateFormat
                              value={expiryDate}
                              onChange={(val) => setExpiryDate(val)}
                            />
                          </div>
                        </Flex>
                      </Field.Root>
                    </Fieldset.Root>
                  </VStack>
                </GridItem>
              </Grid>
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
                    onClick={onClose}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Kembali
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
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Tambah Produk
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

export default ModalAddProduct;
