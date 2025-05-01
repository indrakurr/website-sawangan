import { useState } from "react";
import Logo from "../../assets/logo-sawangan.svg";
import hamburger_active from "../../assets/x-bold.svg";
import hamburger_non_active from "../../assets/list-bold.svg";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const menuItems = [
    { text: "Beranda", href: "/" },
    { text: "Tentang Kami", href: "/tentang" },
    { text: "Produk", href: "/produk" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Flex
          w="full"
          maxW="1600px"
          mx="auto"
          px={{ base: "16px", sm: "32px", lg: "160px" }}
          py={{ base: "12px", sm: "14px", lg: "16px" }}
          justify="space-between"
          align="center"
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"gray.100"}
        >
          <div className="w-28 order-1 sm:order-2 lg:order-1">
            <RouterLink to="/">
              <img src={Logo} alt="navbar-logo" />
            </RouterLink>
          </div>

          <div
            className="cursor-pointer order-2 sm:order-1 lg:hidden"
            onClick={() => setToggleNavbar(toggleNavbar ? false : true)}
          >
            <img
              className="w-9"
              src={toggleNavbar ? hamburger_active : hamburger_non_active}
              alt="toggle"
            />
          </div>
          <div className="hidden lg:block lg:order-2">
            <ul className="flex gap-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    as={RouterLink}
                    to={item.href}
                    fontSize="md"
                    fontWeight="medium"
                    color="black"
                    _hover={{ color: "orange.500", textDecoration: "none" }}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:block order-3 lg:order-3">
            <Button
              as={RouterLink}
              to="/login"
              size={"sm"}
              bg={"orange.500"}
              color={"white"}
              rounded={"xl"}
              px={5}
              py={4}
              _hover={{ bg: "orange.700" }}
            >
              <Text lineHeight="1" whiteSpace="nowrap">
                Masuk
              </Text>
            </Button>
          </div>
        </Flex>
        <div
          className={`${toggleNavbar ? "block" : "hidden"} lg:hidden bg-white`}
        >
          <Box padding={4}>
            <ul className="text-start bg-white flex flex-col">
              <Button
                as={RouterLink}
                to="/login"
                size={"sm"}
                bg={"orange.500"}
                color={"white"}
                borderRadius={"lg"}
                px={4}
                justifyContent={"flex-start"}
                _hover={{ bg: "orange.600" }}
              >
                Masuk
              </Button>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    as={RouterLink}
                    to={item.href}
                    fontSize="md"
                    fontWeight="medium"
                    color="black"
                    px={4}
                    py={2}
                    _hover={{ color: "orange.500", textDecoration: "none" }}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </div>
      </nav>
    </>
  );
}
