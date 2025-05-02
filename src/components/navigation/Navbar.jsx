import { useState } from "react";
import Logo from "../../assets/logo-sawangan.svg";
import { Box, Button, Flex, Link, Text, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ShoppingCart, User, List, X } from "@phosphor-icons/react";

export default function Navbar() {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const menuItems = [
    { text: "Beranda", href: "/" },
    { text: "Tentang Kami", href: "/about" },
    { text: "Produk", href: "/products" },
  ];

  const mobileItems = isLoggedIn
    ? [...menuItems, { text: "Profil", href: "/profile" }]
    : menuItems;

  return (
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
        {/* LOGO */}
        <div className="w-28">
          <RouterLink to="/">
            <img src={Logo} alt="navbar-logo" />
          </RouterLink>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:block">
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

        {/* DESKTOP CTA / ICON */}
        <div className="hidden sm:flex items-center gap-4">
          {!isLoggedIn ? (
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
          ) : (
            <>
              <Link as={RouterLink} to="/cart">
                <Icon as={ShoppingCart} boxSize={6} color="black" />
              </Link>
              <Link as={RouterLink} to="/profile">
                <Icon as={User} boxSize={6} color="black" />
              </Link>
            </>
          )}
        </div>

        {/* MOBILE RIGHT SIDE: CART + HAMBURGER */}
        {isLoggedIn ? (
          <div className="flex gap-4 items-center lg:hidden">
            <Link as={RouterLink} to="/cart">
              <Icon as={ShoppingCart} boxSize={6} color="black" />
            </Link>
            <div
              className="cursor-pointer"
              onClick={() => setToggleNavbar((prev) => !prev)}
            >
              <Icon as={toggleNavbar ? X : List} boxSize={6} color="black" />
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer lg:hidden"
            onClick={() => setToggleNavbar((prev) => !prev)}
          >
            <Icon as={toggleNavbar ? X : List} boxSize={6} color="black" />
          </div>
        )}
      </Flex>

      {/* MOBILE MENU */}
      <div
        className={`${toggleNavbar ? "block" : "hidden"} lg:hidden bg-white`}
      >
        <Box padding={4}>
          <ul className="text-start bg-white flex flex-col gap-2">
            {!isLoggedIn && (
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
            )}
            {mobileItems.map((item, index) => (
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
  );
}
