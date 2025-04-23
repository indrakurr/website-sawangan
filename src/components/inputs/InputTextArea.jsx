import { Box, Textarea, defineStyle } from "@chakra-ui/react";
import { forwardRef } from "react";

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "white",
  px: "2",
  color: "#949494",
  marginLeft: "0", 
  top: "-2.5",
  insetStart: "8",
  fontSize: "12px",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: { base: "4", lg: "3" },
    insetStart: "3",
    fontSize: { base: "12px", lg: "16px" },
  },
  _peerFocusVisible: {
    color: "black",
    top: "-2.5",
    insetStart: "8",
    fontSize: "12px",
  },
});

export const InputTextArea = forwardRef(
  ({ label, w = "full", ...props }, ref) => {
    return (
      <Box pos="relative" w={w}>
        {/* TextArea Field */}
        <Textarea
          ref={ref}
          className="peer"
          placeholder=" "
          py="1rem"
          px="0.75rem"
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.300"
          color="black"
          _focusVisible={{ borderColor: "black" }}
          {...props}
        />

        {/* Floating Label */}
        <Box as="label" css={floatingStyles}>
          {label}
        </Box>
      </Box>
    );
  }
);

InputTextArea.displayName = "InputTextArea";
