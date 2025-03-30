import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

const Counter = ({ defaultValue = 1, min = 1, max = 99, size = "sm" }) => {
  return (
    <NumberInput.Root
      defaultValue={defaultValue}
      min={min}
      max={max}
      unstyled
      spinOnPress={false}
    >
      <HStack gap="2">
        <NumberInput.DecrementTrigger asChild>
          <IconButton variant="subtle" size={size} bg={"orange.100"}>
            <LuMinus color="orange"/>
          </IconButton>
        </NumberInput.DecrementTrigger>
        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" color="black" />
        <NumberInput.IncrementTrigger asChild>
          <IconButton variant="subtle" size={size} bg="orange.100">
            <LuPlus color="orange"/>
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  );
};

export default Counter;
