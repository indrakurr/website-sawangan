import { useState } from "react";
import { Box, VStack, Button, Image, Flex, Text } from "@chakra-ui/react";
import {
  House,
  ShoppingCart,
  ClipboardText,
  UsersThree,
} from "@phosphor-icons/react";
import LogoThumb from "../../assets/logo.png";
import LogoSawangan from "../../assets/logo-sawangan.png";

// Komponen Navigasi Sidebar
const NavItem = ({ Icon, label, isActive, isExpanded, onClick }) => (
  <Button
    onClick={onClick}
    justifyContent={isExpanded ? "flex-start" : "center"}
    w="100%"
    variant="ghost"
    bg={isActive ? "orange.400" : "transparent"}
    color={isActive ? "white" : "black"}
    _hover={{ bg: isActive ? "orange.500" : "gray.100" }}
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
const Sidebar = ({ collapse, setCollapse }) => {
  const [activeMenu, setActiveMenu] = useState("Pesanan");

  return (
    <Box
      w={collapse ? "80px" : "250px"}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      paddingX={6}
      paddingY={3}
      minH="100vh"
      transition="width 0.2s ease"
      boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.05)"}
    >
      <VStack spacing={6} align={collapse ? "center" : "flex-start"}>
        <Flex w="full" justify="center">
          <Image
            src={collapse ? LogoThumb : LogoSawangan}
            alt="Logo"
            boxSize={collapse ? "50px" : "auto"}
            height="50px"
            marginY="14px"
            objectFit="contain"
            cursor="pointer"
            onClick={() => setCollapse(!collapse)} // Toggle collapse state
            transition="transform 0.2s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
        </Flex>

        <Box w="100%" h="1px" bg="orange.500" transition="width 0.2s ease" />

        {/* Menu Item */}
        <VStack marginTop={"14px"}>
          <NavItem
            Icon={House}
            label="Beranda"
            isActive={activeMenu === "Beranda"}
            isExpanded={!collapse}
            onClick={() => setActiveMenu("Beranda")}
          />
          <NavItem
            Icon={ShoppingCart}
            label="Produk"
            isActive={activeMenu === "Produk"}
            isExpanded={!collapse}
            onClick={() => setActiveMenu("Produk")}
          />
          <NavItem
            Icon={ClipboardText}
            label="Pesanan"
            isActive={activeMenu === "Pesanan"}
            isExpanded={!collapse}
            onClick={() => setActiveMenu("Pesanan")}
          />
          <NavItem
            Icon={UsersThree}
            label="Manajemen Pengguna"
            isActive={activeMenu === "Manajemen Pengguna"}
            isExpanded={!collapse}
            onClick={() => setActiveMenu("Manajemen Pengguna")}
          />
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
