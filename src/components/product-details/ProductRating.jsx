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

export default function ProductRating() {
  const rating = 4.5;
  const totalRatings = 120;
  const filledStars = Math.floor(rating);
  const reviewsPerPage = 5;

  // Data ulasan pengguna (diperbanyak)
  const reviews = [
    {
      id: 1,
      name: "John Mason",
      profileImg: "https://i.pravatar.cc/300?u=1",
      rating: 4,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      profileImg: "https://i.pravatar.cc/300?u=2",
      rating: 5,
      review:
        "Cras lobortis sapien, Integer aliquam aliquet odio quis accumsan.",
    },
    {
      id: 3,
      name: "Michael Brown",
      profileImg: "https://i.pravatar.cc/300?u=3",
      rating: 3,
      review:
        "Cukup baik, namun ada beberapa bagian yang bisa ditingkatkan lagi.",
    },
    {
      id: 4,
      name: "Emily Davis",
      profileImg: "https://i.pravatar.cc/300?u=4",
      rating: 5,
      review: "Luar biasa! Saya sangat puas dengan produk ini.",
    },
    {
      id: 5,
      name: "David Wilson",
      profileImg: "https://i.pravatar.cc/300?u=5",
      rating: 4,
      review: "Bagus, tapi pengiriman agak lambat.",
    },
    {
      id: 6,
      name: "Sophia Anderson",
      profileImg: "https://i.pravatar.cc/300?u=6",
      rating: 5,
      review: "Sangat direkomendasikan!",
    },
    {
      id: 7,
      name: "James Lee",
      profileImg: "https://i.pravatar.cc/300?u=7",
      rating: 3,
      review: "Biasa saja, sesuai dengan harga.",
    },
    {
      id: 8,
      name: "Olivia Martinez",
      profileImg: "https://i.pravatar.cc/300?u=8",
      rating: 5,
      review: "Produk berkualitas tinggi dengan harga terjangkau.",
    },
    {
      id: 9,
      name: "William Taylor",
      profileImg: "https://i.pravatar.cc/300?u=9",
      rating: 2,
      review: "Kurang puas, produk tidak sesuai dengan deskripsi.",
    },
    {
      id: 10,
      name: "Isabella Thomas",
      profileImg: "https://i.pravatar.cc/300?u=10",
      rating: 4,
      review: "Kemasan rapi dan produk sesuai ekspektasi.",
    },
    {
      id: 11,
      name: "Daniel White",
      profileImg: "https://i.pravatar.cc/300?u=11",
      rating: 5,
      review: "Barang original, kualitas terbaik!",
    },
    {
      id: 12,
      name: "Emma Harris",
      profileImg: "https://i.pravatar.cc/300?u=12",
      rating: 3,
      review: "Cukup baik, tapi ada sedikit kekurangan di bagian detail.",
    },
    {
      id: 13,
      name: "Benjamin Scott",
      profileImg: "https://i.pravatar.cc/300?u=13",
      rating: 4,
      review: "Harga sesuai dengan kualitas, worth it!",
    },
    {
      id: 14,
      name: "Charlotte Miller",
      profileImg: "https://i.pravatar.cc/300?u=14",
      rating: 5,
      review: "Super recommended, pengiriman cepat!",
    },
    {
      id: 15,
      name: "Henry Clark",
      profileImg: "https://i.pravatar.cc/300?u=15",
      rating: 2,
      review: "Kurang memuaskan, ada sedikit cacat pada produk.",
    },
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  return (
    <Container className="product-rating" marginTop={"10px"} marginBottom={"24px"}>
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
            fontWeight="bold"
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
              {rating} / 5
            </Text>
            <HStack style={{ gap: "1px" }} spacing={1} mt={1}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={i < filledStars ? "#FFA500" : "#ccc"}
                  weight="fill"
                />
              ))}
              <Text color={"gray.800"} fontSize={"xs"}>
                ({totalRatings}) Penilaian
              </Text>
            </HStack>
          </Box>
        </GridItem>

        {/* Bagian Review Pengguna */}
        <GridItem
          className="col-span-1 flex flex-col gap-4"
          w="full"
          borderY={1}
          borderStyle={"solid"}
          borderColor={"#E8ECEF"}
        >
          <Stack padding={{ base: "16px", lg: "24px" }} gap={6}>
            {displayedReviews.map((user, index) => (
              <HStack
                key={user.id}
                gap={6}
                alignItems="flex-start"
                paddingBottom={
                  index !== displayedReviews.length - 1 ? "16px" : "0"
                }
                borderBottom={
                  index !== displayedReviews.length - 1
                    ? "0.5px solid #E8ECEF"
                    : "none"
                }
              >
                <Image
                  src={user.profileImg}
                  alt={`Foto Profil ${user.name}`}
                  boxSize={{ base: "36px", lg: "72px" }}
                  borderRadius="full"
                  objectFit="cover"
                />
                <Stack spacing={1}>
                  <Text
                    fontWeight="medium"
                    fontSize={{ base: "12px", lg: "14px" }}
                    color="gray.800"
                    lineHeight={"0.8"}
                  >
                    {user.name}
                  </Text>
                  <HStack style={{ gap: "1px" }}>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          color={i < user.rating ? "#FFA500" : "#ccc"}
                          weight="fill"
                        />
                      ))}
                  </HStack>
                  <Text
                    color="gray.600"
                    fontSize={{ base: "12px", lg: "14px" }}
                  >
                    {user.review}
                  </Text>
                </Stack>
              </HStack>
            ))}
          </Stack>
        </GridItem>

        {/* Pagination */}
        <Box display="flex" justifyContent="center">
          <PaginationComponent
            totalCount={reviews.length}
            pageSize={reviewsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      </Grid>
    </Container>
  );
}
