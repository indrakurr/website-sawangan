import { useState } from "react";
import { Box, VStack, Button, Image, Flex, Text } from "@chakra-ui/react";
import {
  House,
  ShoppingCart,
  ClipboardText,
  UsersThree,
} from "@phosphor-icons/react";

// Gambar logo
import LogoThumb from "../../assets/logo.png";
import LogoSawangan from "../../assets/logo-sawangan.png";

// Komponen Navigasi Sidebar
const NavItem = ({ Icon, label, isActive, isExpanded }) => (
  <Button
    justifyContent={isExpanded ? "flex-start" : "center"}
    w="100%"
    variant="ghost"
    bg={isActive ? "orange.400" : "transparent"}
    color={isActive ? "white" : "black"}
    _hover={{ bg: isActive ? "orange.500" : "orange.100" }}
    px={isExpanded ? 4 : 0}
    borderRadius="md"
    height="40px"
  >
    <Flex align="center" gap={isExpanded ? 3 : 0}>
      <Icon size={24} />
      {isExpanded && <Text>{label}</Text>}
    </Flex>
  </Button>
);

// Komponen Sidebar Utama
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box
      w={isExpanded ? "250px" : "80px"}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      p={4}
      minH="100vh"
      transition="width 0.2s ease"
    >
      <VStack spacing={6} align={isExpanded ? "flex-start" : "center"}>
        <Image
          src={isExpanded ? LogoSawangan : LogoThumb}
          alt="Logo"
          boxSize={isExpanded ? "auto" : "50px"}
          height="50px"
          marginY="4px"
          objectFit="contain"
          cursor="pointer"
          onClick={handleToggle}
          transition="transform 0.2s ease"
          _hover={{ transform: "scale(1.05)" }}
        />

        <Box w="100%" h="1px" bg="orange.500" transition="width 0.2s ease" />

        {/* Menu Item */}
        <NavItem
          Icon={House}
          label="Beranda"
          isActive={false}
          isExpanded={isExpanded}
        />
        <NavItem
          Icon={ShoppingCart}
          label="Produk"
          isActive={false}
          isExpanded={isExpanded}
        />
        <NavItem
          Icon={ClipboardText}
          label="Pesanan"
          isActive={true}
          isExpanded={isExpanded}
        />
        <NavItem
          Icon={UsersThree}
          label="Manajemen Pengguna"
          isActive={false}
          isExpanded={isExpanded}
        />
      </VStack>
    </Box>
  );
};

export default Sidebar;
