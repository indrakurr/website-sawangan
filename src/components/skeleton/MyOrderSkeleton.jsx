import {
  Box,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
} from "@chakra-ui/react";

export default function MyOrderSkeleton({ rows = 5 }) {
  const skeletonStyle = {
    variant: "shine",
    css: {
      "--start-color": "#EDF2F7", // gray.100
      "--end-color": "#E2E8F0", // gray.200
    },
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      padding={{ base: 4, lg: 6 }}
      boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
      w={{ base: "full", lg: "3/4" }}
    >
      {/* Title Skeleton */}
      <Skeleton height="20px" width="150px" mb={4} {...skeletonStyle} />

      {/* Filter Buttons Skeleton */}
      <HStack spacing={2} mb={6}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton
            key={idx}
            height="32px"
            width="80px"
            borderRadius="md"
            {...skeletonStyle}
          />
        ))}
      </HStack>

      {/* Order Cards Skeleton */}
      <VStack spacing={4}>
        {Array.from({ length: rows }).map((_, i) => (
          <Flex
            key={i}
            p={4}
            borderRadius="xl"
            bg="white"
            boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            gap={4}
            alignItems="center"
            w="full"
          >
            <Skeleton
              boxSize="80px"
              borderRadius="md"
              flexShrink={0}
              {...skeletonStyle}
            />
            <Box w="full">
              <Flex
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                gap={2}
                w="full"
              >
                <Box w="full">
                  <Skeleton
                    height="20px"
                    width="100%"
                    mb={2}
                    {...skeletonStyle}
                  />
                  <Skeleton height="14px" width="60%" {...skeletonStyle} />
                </Box>
                <Skeleton height="20px" width="120px" {...skeletonStyle} />
              </Flex>
              <Flex mt={4} justifyContent="end" w="full">
                <Skeleton
                  height="36px"
                  width="120px"
                  borderRadius="xl"
                  {...skeletonStyle}
                />
              </Flex>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
