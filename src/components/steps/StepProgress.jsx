import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import {
  ShoppingCartSimple,
  CreditCard,
  Truck,
  CheckCircle,
} from "@phosphor-icons/react";
import PropTypes from "prop-types";

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

const StepProgressCustom = ({ activeStep }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const iconSize = useBreakpointValue({ base: 16, lg: 28 });
  const circleSize = useBreakpointValue({ base: "30px", lg: "60px" });
  const fontSize = useBreakpointValue({ base: "12px", lg: "16px" });

  if (isMobile) {
    return (
      <Flex direction="column" align="start" gap={6} overflowX="auto">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const Icon = step.icon;
          return (
            <Flex
              key={index}
              direction="row"
              align="center"
              gap={2}
              minWidth="120px"
            >
              <Flex
                bg={isActive ? "orange.500" : "orange.100"}
                color={isActive ? "white" : "orange.500"}
                borderRadius="full"
                w={circleSize}
                h={circleSize}
                align="center"
                justify="center"
              >
                <Icon size={iconSize} weight="bold" />
              </Flex>
              <Box textAlign="start">
                <Text fontWeight="semibold" color="black" fontSize={fontSize}>
                  {step.title}
                </Text>
                <Text fontSize={fontSize} color="gray.500">
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
            <Flex
              bg={isActive || isCompleted ? "orange.500" : "orange.100"}
              color={isActive || isCompleted ? "white" : "orange.500"}
              borderRadius="full"
              w={circleSize}
              h={circleSize}
              align="center"
              justify="center"
              zIndex={1}
              mx="auto"
            >
              <Icon size={iconSize} weight="bold" />
            </Flex>

            <Box textAlign="center" mt={2}>
              <Text fontWeight="semibold" color="black" fontSize={fontSize}>
                {step.title}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {step.description}
              </Text>
            </Box>

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

StepProgressCustom.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default StepProgressCustom;
