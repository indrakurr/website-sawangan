import {
  Box,
  Container,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Navbar from "../navigation/Navbar";
import Footer from "../sections/Footer";

export default function CartSkeleton() {
  const skeletonStyle = {
    variant: "shine",
    "--start-color": "#EDF2F7", // gray.100
    "--end-color": "#E2E8F0", // gray.200
  };

  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
      <Navbar />
      <Container paddingX={{ base: "0px", lg: "80px" }} marginTop="89px">
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
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={6}
          paddingX={{ base: "12px", lg: "32px" }}
          marginTop={{ base: "16px", lg: "24px" }}
          marginBottom="80px"
        >
          <GridItem>
            <VStack spacing={4}>
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Box key={i} bg="white" p={4} rounded="xl" w="full">
                    <HStack spacing={4}>
                      <Skeleton boxSize="20px" {...skeletonStyle} />
                      <Skeleton
                        boxSize="80px"
                        rounded="md"
                        {...skeletonStyle}
                      />
                      <VStack align="start" spacing={2} flex="1">
                        <Skeleton
                          height="16px"
                          width="70%"
                          {...skeletonStyle}
                        />
                        <Skeleton
                          height="16px"
                          width="50%"
                          {...skeletonStyle}
                        />
                      </VStack>
                      <Skeleton height="32px" width="60px" {...skeletonStyle} />
                    </HStack>
                  </Box>
                ))}
            </VStack>
          </GridItem>
          <GridItem>
            <Box bg="white" p={4} rounded="xl" h="fit-content">
              <Skeleton height="20px" width="40%" mb={4} {...skeletonStyle} />
              <Skeleton height="20px" width="100%" mb={4} {...skeletonStyle} />
              <Skeleton height="40px" width="100%" {...skeletonStyle} />
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Footer display={{ base: "none", lg: "block" }} />
    </div>
  );
}
