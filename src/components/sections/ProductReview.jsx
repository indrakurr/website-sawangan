import { Box, Text, Textarea, VStack, HStack } from "@chakra-ui/react";
import ProdukItem from "../card/CartModal";
import { Star } from "@phosphor-icons/react";

const ProductReview = ({
  items = [],
  reviewList = [],
  onChange = () => {},
}) => {
  return (
    <>
      {items.map((item, index) => (
        <VStack
          key={item.id}
          align="stretch"
          spacing={4}
          borderBottom="1px"
          borderColor="gray.200"
          pb={4}
          w="full"
        >
          <ProdukItem key={item.id} items={[item]} />

          {/* Rating */}
          <Box mt={2}>
            <Text fontWeight="medium" mb={1} color="#949494">
              Kualitas Produk
            </Text>
            <HStack gap={0}>
              {Array.from({ length: 5 }, (_, i) => (
                <Box
                  key={`star-${index}-${i}`}
                  as="button"
                  onClick={() => onChange(index, "rating", i + 1)}
                  cursor="pointer"
                >
                  <Star
                    size={20}
                    weight="fill"
                    color={
                      i < (reviewList[index]?.rating || 0) ? "#FFA500" : "#ccc"
                    }
                  />
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Ulasan */}
          <Box>
            <Text fontWeight="medium" mb={1} color="#949494">
              Ulasan
            </Text>
            <Textarea
              placeholder="Tulis ulasanmu di sini..."
              value={reviewList[index]?.comment || ""}
              onChange={(e) => onChange(index, "comment", e.target.value)}
              color="black"
              fontSize={{ base: "12px", lg: "16px" }}
              borderColor="gray.300"
              height="96px"
            />
          </Box>
        </VStack>
      ))}
    </>
  );
};

export default ProductReview;
