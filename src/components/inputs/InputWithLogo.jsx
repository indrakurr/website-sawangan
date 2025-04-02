import { Box, Input, defineStyle } from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { Show, Hide } from "react-iconly";

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "white",
  px: "2",
  color: "#949494",
  marginLeft: "6",
  top: "-2.5",
  insetStart: "2",
  fontSize: "12px",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "3",
    insetStart: "3",
    fontSize: "16px",
  },
  _peerFocusVisible: {
    color: "black",
    top: "-2.5",
    insetStart: "2",
    fontSize: "12px",
  },
});

export const InputWithLogo = forwardRef(
  ({ label, icon: Icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <Box pos="relative" w="full">
        {/* Icon */}
        {Icon && (
          <Box
            pos="absolute"
            left="0.75rem"
            top="50%"
            transform="translateY(-50%)"
          >
            <Icon size={20} color="#949494" />
          </Box>
        )}

        {/* Input Field */}
        <Input
          ref={ref}
          className="peer"
          placeholder=" "
          type={isPassword && showPassword ? "text" : type}
          pl={Icon ? "2.5rem" : "0.75rem"}
          pr={isPassword ? "2.5rem" : "0.75rem"}
          py="1.5rem"
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

        {/* Show/Hide Password Button */}
        {isPassword && (
          <Box
            pos="absolute"
            right="0.75rem"
            top="50%"
            transform="translateY(-50%)"
            cursor="pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Hide size={20} color="#949494" />
            ) : (
              <Show size={20} color="#949494" />
            )}
          </Box>
        )}
      </Box>
    );
  }
);

InputWithLogo.displayName = "InputWithLogo";
