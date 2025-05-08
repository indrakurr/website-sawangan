import {
  Box,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";

export default function TableProductSkeleton({ rows = 10 }) {
const skeletonStyle = {
  variant: "shine",
  css: {
    "--start-color": "#EDF2F7", // gray.100
    "--end-color": "#E2E8F0", // gray.200
  },
};

  return (
    <VStack spacing={0} align="stretch">
      {/* Header row */}
      <Flex px={6} py={3} bg="gray.50" borderTopRadius="lg">
        <Skeleton height="20px" width="40px" mr={6} {...skeletonStyle} />
        <Skeleton height="20px" width="200px" mr={6} {...skeletonStyle} />
        <Skeleton height="20px" width="100px" mr={6} {...skeletonStyle} />
        <Skeleton height="20px" width="100px" mr={6} {...skeletonStyle} />
        <Skeleton height="20px" width="60px" mr={6} {...skeletonStyle} />
        <Skeleton height="20px" width="80px" {...skeletonStyle} />
      </Flex>

      {/* Skeleton rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <Flex
          key={i}
          px={6}
          py={4}
          borderBottom="1px solid"
          borderColor="gray.100"
          bg={i % 2 === 0 ? "gray.50" : "white"}
        >
          <Box w="40px" mr={6}>
            <Skeleton height="16px" {...skeletonStyle} />
          </Box>
          <Box flex={2} mr={6}>
            <SkeletonText
              noOfLines={2}
              spacing={1}
              skeletonHeight="4px"
              {...skeletonStyle}
            />
          </Box>
          <Box w="100px" mr={6}>
            <Skeleton height="16px" {...skeletonStyle} />
          </Box>
          <Box w="100px" mr={6}>
            <Skeleton height="16px" {...skeletonStyle} />
          </Box>
          <Box w="60px" mr={6}>
            <Skeleton height="16px" {...skeletonStyle} />
          </Box>
          <HStack spacing={2}>
            <Skeleton
              height="24px"
              width="24px"
              borderRadius="md"
              {...skeletonStyle}
            />
            <Skeleton
              height="24px"
              width="24px"
              borderRadius="md"
              {...skeletonStyle}
            />
          </HStack>
        </Flex>
      ))}
    </VStack>
  );
}
