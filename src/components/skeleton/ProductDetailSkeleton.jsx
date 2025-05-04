import {
  Container,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  Box,
  VStack,
  HStack,
  SkeletonCircle,
} from "@chakra-ui/react";
import Navbar from "../navigation/Navbar";
import Footer from "../sections/Footer";

export default function ProductDetailSkeleton() {
  const skeletonStyle = {
    variant: "shine",
    css: {
      "--start-color": "#EDF2F7", // gray.100
      "--end-color": "#E2E8F0", // gray.200
    },
  };

  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
      <Navbar />

      {/* Product Info */}
      <Container marginTop={"80px"}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 6, lg: 24 }}
          bg="white"
          borderRadius={{ base: "16px", lg: "24px" }}
          padding={{ base: "16px", lg: "54px" }}
        >
          <GridItem>
            <Skeleton
              height={{ base: "200px", lg: "400px" }}
              borderRadius="24px"
              {...skeletonStyle}
            />
          </GridItem>
          <GridItem>
            <VStack align="stretch" gapY={4}>
              <Skeleton height="40px" width="70%" {...skeletonStyle} />
              <Skeleton height="32px" width="50%" {...skeletonStyle} />
              <SkeletonText noOfLines={2} spacing="3" {...skeletonStyle} />
              <HStack spacing={1}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      height="16px"
                      width="16px"
                      borderRadius="full"
                      {...skeletonStyle}
                    />
                  ))}
              </HStack>
              <Skeleton height="40px" width="120px" {...skeletonStyle} />
              <Skeleton height="40px" width="200px" {...skeletonStyle} />
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Product Description */}
      <Container marginTop={"10px"}>
        <Box
          bg="white"
          padding={{ base: "16px", lg: "54px" }}
          borderRadius={{ base: "16px", lg: "24px" }}
        >
          <VStack align="stretch" spacing={4}>
            <Skeleton height="24px" width="30%" {...skeletonStyle} />
            <SkeletonText noOfLines={5} spacing="4" {...skeletonStyle} />
            <Skeleton height="24px" width="30%" {...skeletonStyle} />
            <SkeletonText noOfLines={4} spacing="3" {...skeletonStyle} />
          </VStack>
        </Box>
      </Container>

      {/* Product Rating */}
      <Container marginTop={"10px"} marginBottom={"24px"}>
        <Box
          bg="white"
          padding={{ base: "16px", lg: "54px" }}
          borderRadius={{ base: "16px", lg: "24px" }}
        >
          <VStack align="stretch" spacing={6}>
            <Box>
              <Skeleton height="24px" width="40%" {...skeletonStyle} />
              <HStack spacing={1} mt={2}>
                <Skeleton height="32px" width="80px" {...skeletonStyle} />
                <HStack spacing={1}>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        key={i}
                        height="16px"
                        width="16px"
                        borderRadius="full"
                        {...skeletonStyle}
                      />
                    ))}
                </HStack>
              </HStack>
            </Box>

            {/* Simulasi beberapa review */}
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <HStack key={i} spacing={4} align="flex-start">
                  <SkeletonCircle size="10" {...skeletonStyle} />
                  <VStack align="stretch" spacing={2} flex="1">
                    <Skeleton height="16px" width="40%" {...skeletonStyle} />
                    <HStack spacing={1}>
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton
                            key={j}
                            height="16px"
                            width="16px"
                            borderRadius="full"
                            {...skeletonStyle}
                          />
                        ))}
                    </HStack>
                    <SkeletonText
                      noOfLines={2}
                      spacing="2"
                      {...skeletonStyle}
                    />
                  </VStack>
                </HStack>
              ))}
          </VStack>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}
