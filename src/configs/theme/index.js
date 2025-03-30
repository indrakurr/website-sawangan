import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    mainOrange: {
      500: "#F77E21",
    },
  },
});
