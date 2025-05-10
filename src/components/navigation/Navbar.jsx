import { useState } from "react";
import Logo from "../../assets/logo-sawangan.svg";
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Icon,
  Float,
  Circle,
  Menu,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ShoppingCart, User, List, X } from "@phosphor-icons/react";
import { useGetCartQuery } from "../../store/store";
import { Box1, Logout } from "iconsax-react";

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

    const { data: cartData } = useGetCartQuery(undefined, {
      skip: !isLoggedIn,
    });

    const totalCartItems =
      cartData?.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-70">
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
              <Box position="relative">
                <Link as={RouterLink} to="/cart">
                  <Icon
                    as={ShoppingCart}
                    boxSize={6}
                    color="black"
                    marginTop={"4px"}
                  />
                </Link>
                {totalCartItems > 0 && (
                  <Float offsetY="6px" offsetX="1px">
                    <Circle size="4" bg="red.500" color="white" fontSize="xs">
                      {totalCartItems}
                    </Circle>
                  </Float>
                )}
              </Box>

              <Menu.Root positioning={{ placement: "bottom-end" }}>
                <Menu.Trigger asChild>
                  <Icon as={User} boxSize={6} color="black" cursor="pointer" />
                </Menu.Trigger>
                <Menu.Positioner>
                  <Menu.Content
                    padding="16px"
                    borderRadius="12px"
                    backgroundColor="white"
                    boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
                  >
                    <Menu.Item
                      asChild
                      paddingX={3}
                      paddingY={2}
                      borderRadius="md"
                      _hover={{ bg: "gray.100" }}
                    >
                      <Link as={RouterLink} to="/profile">
                        <Flex align="center" gap={2}>
                          <User size={16} color="black" />
                          <Text fontSize="14px" color="black">
                            Profil
                          </Text>
                        </Flex>
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      asChild
                      paddingX={3}
                      paddingY={2}
                      borderRadius="md"
                      _hover={{ bg: "gray.100" }}
                    >
                      <Link as={RouterLink} to="/orders">
                        <Flex align="center" gap={2}>
                          <Box1 size={16} color="black" />
                          <Text fontSize="14px" color="black">
                            Pesanan Saya
                          </Text>
                        </Flex>
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      color="red.500"
                      paddingX={3}
                      paddingY={2}
                      borderRadius="md"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                    >
                      <Flex align="center" gap={2}>
                        <Logout size={16} color="red" />
                        <Text fontSize="14px">Keluar</Text>
                      </Flex>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            </>
          )}
        </div>

        {/* MOBILE RIGHT SIDE: CART + HAMBURGER */}
        {isLoggedIn ? (
          <div className="flex gap-4 items-center lg:hidden">
            <Box position="relative">
              <Link as={RouterLink} to="/cart">
                <Icon
                  as={ShoppingCart}
                  boxSize={6}
                  color="black"
                  marginTop={"4px"}
                />
              </Link>
              {totalCartItems > 0 && (
                <Float offsetY="6px" offsetX="1px">
                  <Circle size="4" bg="red.500" color="white" fontSize="xs">
                    {totalCartItems}
                  </Circle>
                </Float>
              )}
            </Box>

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
