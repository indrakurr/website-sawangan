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
import { InputWithLogo } from "../../inputs/InputWithLogo";
import { InputTextArea } from "../../inputs/InputTextArea";
import { InputWithElement } from "../../inputs/InputWithElement";
import { InputDateFormat } from "../../inputs/InputDateFormat";
import { ShoppingCart, Package } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import { ImageField } from "../../inputs/ImageField";
import {
  Category2,
  ArrowDown2,
  WeightMeter,
  CloseSquare,
  Tag2,
} from "iconsax-react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../store/store";
import { toaster } from "../../ui/toaster";

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date
    .toLocaleDateString("id-ID")
    .split("/")
    .map((d) => d.padStart(2, "0"))
    .join("/");
};

const formatToISODate = (str) => {
  const [day, month, year] = str.split("/");
  return `${year}-${month}-${day}`;
};

const ModalEditProduct = ({ isOpen, onClose, productId, onSuccess }) => {
  const imageRef = useRef();
  const handleImageRef = () => imageRef.current?.click();
  const kategoriList = ["Makanan", "Minuman", "Aksesoris"];

  const { register, handleSubmit, reset, control } = useForm();

  const [selected, setSelected] = useState("Pilih Kategori");
  const [expiryDate, setExpiryDate] = useState("");

  const { data, isLoading: loadingProduct } = useGetProductByIdQuery(
    productId,
    {
      skip: !isOpen,
    }
  );

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.data && isOpen) {
      const p = data.data;
      reset({
        "nama-produk": p.name,
        "harga-produk": p.price,
        "deskripsi-produk": p.description,
        "berat-produk": p.weight,
        "stok-produk": p.stock,
        uploadImage: p.imageUrl,
      });
      setSelected(p.category);
      setExpiryDate(formatDate(p.expiryDate));
    } else if (isOpen) {
      reset({
        "nama-produk": "",
        "harga-produk": "",
        "deskripsi-produk": "",
        "berat-produk": "",
        "stok-produk": "",
        uploadImage: null,
      });
      setSelected("Pilih Kategori");
      setExpiryDate("");
    }
  }, [isOpen, productId, data]);

  const onSubmit = async (formDataInput) => {
    const formData = new FormData();
    formData.append("name", formDataInput["nama-produk"]);
    formData.append("price", formDataInput["harga-produk"]);
    formData.append("description", formDataInput["deskripsi-produk"]);
    formData.append("category", selected);
    formData.append("weight", formDataInput["berat-produk"]);
    formData.append("stock", formDataInput["stok-produk"]);
    formData.append("expiryDate", formatToISODate(expiryDate));

    if (
      formDataInput.uploadImage &&
      formDataInput.uploadImage[0] instanceof File
    ) {
      formData.append("image", formDataInput.uploadImage[0]);
    }

    const toastId = toaster.loading({
      title: "Menyimpan perubahan...",
      duration: 4000,
    });
    try {
      await updateProduct({ productId, formData }).unwrap();
      toaster.success({
        title: "Berhasil",
        description: "Produk berhasil diperbarui",
      });
      onClose();
      if (onSuccess) onSuccess();
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
                Edit Produk
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
                        {...register("nama-produk")}
                      />
                      <InputWithLogo
                        w="1/3"
                        id="harga-produk"
                        label="Harga Produk"
                        type="number"
                        icon={Tag2}
                        {...register("harga-produk")}
                      />
                    </Flex>
                    <InputTextArea
                      label="Deskripsi Produk"
                      id="deskripsi-produk"
                      rows={5}
                      {...register("deskripsi-produk")}
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
                                  <Text color="black" fontWeight="normal">
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
                              {...register("berat-produk")}
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
                              {...register("stok-produk")}
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
                              onChange={setExpiryDate}
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
                    isLoading={isLoading}
                  >
                    <Text lineHeight="1" whiteSpace="nowrap">
                      Simpan
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

export default ModalEditProduct;
