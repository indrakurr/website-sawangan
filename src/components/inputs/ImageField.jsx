import { Controller } from "react-hook-form";
import { GalleryAdd } from "iconsax-react";
import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";

export function ImageField({ control, imageRef, handleImageRef }) {
  return (
    <Controller
      name="uploadImage"
      control={control}
      render={({ field }) => (
        <Flex direction={"column"} gap={2}>
          <Input
            name="uploadImage"
            type="file"
            display={"none"}
            ref={imageRef}
            accept={".jpg,.png, .jpeg"}
            onChange={(e) => {
              field.onChange(e.target.files);
            }}
          />
          <Text color={"#828282"}>Gambar Produk</Text>
          <Flex
            w={"full"}
            position={"relative"}
            aspectRatio={"4/3"}
            justifyContent={"center"}
            alignItems={"center"}
            border={field.value ? "none" : "2px dashed #A0AEC0"}
            borderRadius={"lg"}
            flexDirection={"column"}
            cursor={"pointer"}
            onClick={handleImageRef}
          >
            {field.value ? (
              <>
                <Image
                  src={
                    field.value && field.value[0] instanceof File
                      ? URL.createObjectURL(field.value[0])
                      : field.value
                  }
                  alt={"upload-image"}
                  aspectRatio={"4/3"}
                  objectFit={"cover"}
                  borderRadius={"lg"}
                />
                <Box
                  position={"absolute"}
                  p={"0.5rem"}
                  borderRadius={"0.5rem 0 0.5rem 0"}
                  right={"0"}
                  bottom={"0"}
                  bg={"#00000066"}
                  zIndex={10}
                >
                  <Edit2 color="white" size={24} />
                </Box>
              </>
            ) : (
              <>
                <GalleryAdd size={56} color="gray" variant="Outline"/>
                <Text color={"#828282"} marginTop={2}>Unggah Gambar Produk</Text>
              </>
            )}
          </Flex>
          <Text color={"#828282"} fontSize={"sm"} textAlign={"center"}>
            Max 10 Mb, Format JPG & PNG
          </Text>
        </Flex>
      )}
    />
  );
}
