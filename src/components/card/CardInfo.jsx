import { Box, Flex, Text } from "@chakra-ui/react";

const CardInfo = ({
  icon: Icon, 
  iconBg = "#D61C4E", // Warna latar ikon
  iconColor = "white", // Warna ikon
  title = "Judul",
  titleFontSize = "20px",
  value = "0",
  valueFontSize = "36px",
}) => {
  return (
    <Flex
      bg="white"
      boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
      padding={6}
      borderRadius="20px"
      h="full"
      direction="column"
      justifyContent="space-between"
    >
      <Box
        boxSize="40px"
        bg={iconBg}
        borderRadius="8px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        alignSelf="end"
      >
        {Icon && <Icon size={24} color={iconColor} weight="bold" />}
      </Box>

      <Flex direction="column">
        <Text
          fontSize={titleFontSize}
          fontWeight="semibold"
          color="gray.400"
          wordBreak="break-word"
          lineHeight="1.2"
        >
          {title}
        </Text>
        <Text
          fontSize={valueFontSize}
          fontWeight="bold"
          color="black"
          wordBreak="break-word"
          lineHeight="1.2"
        >
          {value}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardInfo;
