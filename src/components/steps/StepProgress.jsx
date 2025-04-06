import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import {
  ShoppingCartSimple,
  CreditCard,
  Truck,
  CheckCircle,
} from "@phosphor-icons/react";

const steps = [
  {
    title: "Pesanan Dibuat",
    description: "04 Apr 2025 - 10:15",
    icon: ShoppingCartSimple,
  },
  {
    title: "Pesanan Dibayarkan",
    description: "04 Apr 2025 - 10:30",
    icon: CreditCard,
  },
  {
    title: "Pesanan Dikirim",
    description: "05 Apr 2025 - 08:00",
    icon: Truck,
  },
  {
    title: "Pesanan Diterima",
    description: "06 Apr 2025 - 14:45",
    icon: CheckCircle,
  },
];

const activeStep = 2;

const StepProgressCustom = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex direction="column" align="start" gap={6}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const Icon = step.icon;
          return (
            <Flex key={index} direction="row" align="center" gap={4}>
              <Flex
                bg={isActive ? "orange.500" : "orange.100"}
                color={isActive ? "white" : "orange.500"}
                borderRadius="full"
                w="60px"
                h="60px"
                align="center"
                justify="center"
              >
                <Icon size={28} weight="bold" />
              </Flex>
              <Box>
                <Text fontWeight="semibold" color="black">
                  {step.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {step.description}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    );
  }

  return (
    <Flex direction="row" align="center" justify="space-between" w="100%">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const Icon = step.icon;

        return (
          <Flex
            key={index}
            direction="column"
            align="center"
            position="relative"
            flex={1}
          >
            {/* Lingkaran icon */}
            <Flex
              bg={isActive || isCompleted ? "orange.500" : "orange.100"}
              color={isActive || isCompleted ? "white" : "orange.500"}
              borderRadius="full"
              w="60px"
              h="60px"
              align="center"
              justify="center"
              zIndex={1}
              mx="auto"
            >
              <Icon size={28} weight="bold" />
            </Flex>

            {/* Judul dan deskripsi */}
            <Box textAlign="center" mt={2}>
              <Text fontWeight="semibold" color="black">
                {step.title}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {step.description}
              </Text>
            </Box>

            {/* Garis penghubung */}
            {index !== steps.length - 1 && (
              <Box
                position="absolute"
                top="30px"
                left="50%"
                width="100%"
                height="2px"
                bg={isCompleted ? "orange.500" : "orange.200"}
                zIndex={0}
                transform="translateX(30px)"
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

export default StepProgressCustom;
