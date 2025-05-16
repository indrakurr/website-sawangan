import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Star } from "@phosphor-icons/react";
import PaginationComponent from "../pagination/Pagination";

export default function ProductRating({ product }) {
  const rating = product.ratingAvg || 0;
  const reviews = product.Review || [];
  const filledStars = Math.floor(rating);
  const reviewsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  return (
    <Container
      className="product-rating"
      marginTop={"10px"}
      marginBottom={"24px"}
    >
      <Grid
        padding={{ base: "16px", lg: "54px" }}
        borderRadius={{ base: "16px", lg: "24px" }}
        bg="white"
        w="full"
        maxW="100%"
        overflow="hidden"
        gap={6}
      >
        {/* Bagian Rating Produk */}
        <GridItem className="col-span-1 flex flex-col gap-4" w="full">
          <Text
            textAlign={{ sm: "center", md: "left", lg: "left" }}
            fontSize={{ base: "20px", lg: "24px" }}
            fontWeight="semibold"
            color="black"
            lineHeight={"0.8"}
          >
            Penilaian Produk
          </Text>
          <Box>
            <Text
              textAlign={{ sm: "center", md: "left", lg: "left" }}
              fontSize={{ base: "20px", lg: "32px" }}
              fontWeight="semibold"
              color="#F77E21"
              lineHeight={"1.2"}
            >
              {rating.toFixed(1)} / 5
            </Text>
            <HStack style={{ gap: "1px" }} spacing={1} mt={1}>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    color={i < filledStars ? "#FFA500" : "#ccc"}
                    weight="fill"
                  />
                ))}
              <Text color={"gray.800"} fontSize={"xs"}>
                ({reviews.length}) Penilaian
              </Text>
            </HStack>
          </Box>
        </GridItem>

        {/* Bagian Review Pengguna */}
        <GridItem
          className="col-span-1 flex flex-col gap-4"
          w="full"
          borderY={1}
          borderStyle="solid"
          borderColor="#E8ECEF"
        >
          {reviews.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={6}>
              Belum ada ulasan untuk produk ini.
            </Text>
          ) : (
            <Stack p={{ base: "16px", lg: "24px" }} gap={6}>
              {displayedReviews.map((user, index) => (
                <HStack
                  key={user.id}
                  gap={6}
                  alignItems="flex-start"
                  pb={index !== displayedReviews.length - 1 ? "16px" : "0"}
                  borderBottom={
                    index !== displayedReviews.length - 1
                      ? "0.5px solid #E8ECEF"
                      : "none"
                  }
                >
                  <Image
                    src={
                      user.user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.user?.fullName || "User"
                      )}`
                    }
                    alt={`Foto Profil ${user.user?.fullName || "User"}`}
                    boxSize={{ base: "36px", lg: "72px" }}
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <Stack spacing={1}>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "12px", lg: "14px" }}
                      color="gray.800"
                    >
                      {user.user?.fullName || "User"}
                    </Text>
                    <HStack gap={0}>
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            color={i < user.rating ? "#FFA500" : "#ccc"}
                            weight="fill"
                          />
                        ))}
                    </HStack>
                    <Text
                      color="gray.600"
                      fontSize={{ base: "12px", lg: "14px" }}
                    >
                      {user.comment || "-"}
                    </Text>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          )}
        </GridItem>

        {/* Pagination */}
        {reviews.length > reviewsPerPage && (
          <Box display="flex" justifyContent="center">
            <PaginationComponent
              totalCount={reviews.length}
              pageSize={reviewsPerPage}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </Box>
        )}
      </Grid>
    </Container>
  );
}
