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
  return (
    <Box
      w={collapse ? "80px" : "250px"}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      p={4}
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
        <NavItem
          Icon={House}
          label="Beranda"
          isActive={false}
          isExpanded={!collapse}
        />
        <NavItem
          Icon={ShoppingCart}
          label="Produk"
          isActive={false}
          isExpanded={!collapse}
        />
        <NavItem
          Icon={ClipboardText}
          label="Pesanan"
          isActive={true} // Assuming this is active
          isExpanded={!collapse}
        />
        <NavItem
          Icon={UsersThree}
          label="Manajemen Pengguna"
          isActive={false}
          isExpanded={!collapse}
        />
      </VStack>
    </Box>
  );
};

export default Sidebar;
