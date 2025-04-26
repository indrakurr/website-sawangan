import { Box, Input } from "@chakra-ui/react";
import { forwardRef, useState } from "react";

// Fungsi export baru
export function formatDateMMDDYY(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
}

export const InputWithElement = forwardRef(
  (
    {
      startElement,
      endElement,
      type = "text",
      w = "full",
      value,
      defaultValue,
      onChange,
      onDateChange, // Tambahan kalau date
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const isDateCustom = type === "dateCustom";
    const inputType = isDateCustom ? "text" : type;

    // Deteksi apakah ada value
    const hasValue =
      value?.toString().length > 0 || defaultValue?.toString().length > 0;

    const handleChange = (e) => {
      if (isDateCustom) {
        let val = e.target.value.replace(/[^\d/]/g, "");

        // Otomatis tambah '/' setelah 2 angka dan 5 angka
        if (val.length === 2 || val.length === 5) {
          if (!val.endsWith("/")) {
            val += "/";
          }
        }
        if (val.length > 8) val = val.slice(0, 8);

        if (onChange) {
          e.target.value = val;
          onChange(e);
        }
        if (onDateChange && val.length === 8) {
          const [month, day, year] = val.split("/");
          const formattedDate = new Date(`20${year}-${month}-${day}`);
          onDateChange(formattedDate);
        }
      } else {
        if (onChange) onChange(e);
      }
    };

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
          type={inputType}
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
          onChange={handleChange}
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
