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
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const [activeMenu, setActiveMenu] = useState(() => {
    if (path.includes("/dashboard/product")) return "Produk";
    if (path.includes("/dashboard/orders")) return "Pesanan";
    if (path.includes("/dashboard/users")) return "Manajemen Pengguna";
    return "Beranda";
  });

  const handleNavigation = (menuName, path) => {
    setActiveMenu(menuName);
    navigate(path);
  };

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
        <VStack marginTop={"14px"} w={"full"}>
          <NavItem
            Icon={House}
            label="Beranda"
            isActive={activeMenu === "Beranda"}
            isExpanded={!collapse}
            onClick={() => handleNavigation("Beranda", "/dashboard")}
          />
          <NavItem
            Icon={ShoppingCart}
            label="Kelola Produk"
            isActive={activeMenu === "Produk"}
            isExpanded={!collapse}
            onClick={() => handleNavigation("Produk", "/dashboard/products")}
          />
          <NavItem
            Icon={ClipboardText}
            label="Kelola Pesanan"
            isActive={activeMenu === "Pesanan"}
            isExpanded={!collapse}
            onClick={() => handleNavigation("Pesanan", "/dashboard/orders")}
          />
          <NavItem
            Icon={UsersThree}
            label="Kelola Pengguna"
            isActive={activeMenu === "Manajemen Pengguna"}
            isExpanded={!collapse}
            onClick={() =>
              handleNavigation("Manajemen Pengguna", "/dashboard/users")
            }
          />
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
