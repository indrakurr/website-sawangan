import { Box, Input } from "@chakra-ui/react";
import { forwardRef, useState } from "react";

export const InputWithElement = forwardRef(
  (
    {
      startElement,
      endElement,
      type = "text",
      w = "full",
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Deteksi apakah ada value (baik dari props atau defaultValue)
    const hasValue =
      value?.toString().length > 0 || defaultValue?.toString().length > 0;

    return (
      <Box pos="relative" w={w}>
        {/* Start Element */}
        {startElement && (
          <Box
            pos="absolute"
            left="0.75rem"
            top="50%"
            transform="translateY(-50%)"
          >
            {startElement}
          </Box>
        )}

        {/* Input Field */}
        <Input
          ref={ref}
          type={type}
          pl={startElement ? "2.5rem" : "0.75rem"}
          pr={endElement ? "2.5rem" : "0.75rem"}
          py="1.5rem"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.300"
          color="black"
          lineHeight={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          defaultValue={defaultValue}
          _focusVisible={{ borderColor: "black" }}
          {...props}
        />

        {/* End Element */}
        {(isFocused || hasValue) && endElement && (
          <Box
            pos="absolute"
            right="0.75rem"
            top="50%"
            transform="translateY(-50%)"
          >
            {endElement}
          </Box>
        )}
      </Box>
    );
  }
);

InputWithElement.displayName = "InputWithElement";
