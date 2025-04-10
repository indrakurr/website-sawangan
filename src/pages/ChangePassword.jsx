import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft2 } from "iconsax-react";
import Navbar from "../components/navigation/Navbar";
import { InputWithLogo } from "../components/inputs/InputWithLogo";
import { User } from "react-iconly";
import { Lock } from "react-iconly";
import { PasswordCheck, Logout } from "iconsax-react";
import Footer from "../components/sections/Footer";
import { Category2, ArrowDown2 } from "iconsax-react";

export default function ChangePassword() {
  const [activePage, setActivePage] = useState("ubah-password");

  return (
    <div className="overflow-x-hidden w-full max-w-screen mx-0 bg-[#F0F3F7]">
      <Navbar />
      <Container paddingX={{ base: "0px", lg: "80px" }}>
        <Grid
          className="grid lg:grid-cols-4 sm:grid-rows-1"
          marginTop={{ base: "72px", lg: "89px" }}
          marginBottom={{ base: "24px", lg: "52px" }}
          paddingX={{ base: "12px", lg: "32px" }}
          gap={{ base: "12px", lg: "24px" }}
        >
          <GridItem colSpan={{ base: 3, lg: 1 }}>
            <Box
              bg="white"
              borderRadius="xl"
              padding={{ base: 4, lg: 6 }}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Flex
                direction={{ base: "row", lg: "row" }}
                justify="space-between"
                align="center"
              >
                <Flex>
                  <Image
                    boxSize={{ base: "40px", lg: "60px" }}
                    borderRadius="full"
                    src="https://i.pravatar.cc/300?u=111"
                    alt="profile-image"
                  />
                  <Box marginLeft={3} alignSelf={"center"}>
                    <Text
                      fontSize={{ base: "12px", lg: "16px" }}
                      fontWeight="semibold"
                      color="black"
                      wordBreak="break-word"
                    >
                      Lorem Ipsum
                    </Text>
                    <Text
                      fontSize={{ base: "12px", lg: "14px" }}
                      fontWeight="regular"
                      color="gray.400"
                      wordBreak="break-word"
                    >
                      loremipsum@gmail.com
                    </Text>
                  </Box>
                </Flex>
                <Box display={{ base: "block", lg: "none" }}>
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button
                        backgroundColor={"transparent"}
                        size="sm"
                        border={"none"}
                        _focusVisible={{ outline: "none", boxShadow: "none" }}
                      >
                        <Category2 color="black" />
                        <ArrowDown2 color="black" />
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content
                          padding="16px"
                          borderRadius="12px"
                          backgroundColor="white"
                          boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
                        >
                          <Menu.Item
                            color="black"
                            value="new-txt"
                            _hover={{ bg: "#FFFEE5" }}
                          >
                            Profil
                          </Menu.Item>
                          <Menu.Item
                            color="black"
                            value="new-file"
                            _hover={{ bg: "#FFFEE5" }}
                          >
                            Ubah Password
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            value="new-win"
                            _hover={{ bg: "#FFFEE5" }}
                          >
                            Keluar
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Box>
              </Flex>

              <Box
                flex="1"
                height="1px"
                bg="gray.200"
                marginTop={4}
                display={{ base: "none", lg: "block" }}
              />
              <VStack
                marginTop={4}
                display={{ base: "none", lg: "block" }}
                spaceY={2}
              >
                {/* Button group for larger screens */}
                <Button
                  size="sm"
                  width="full"
                  bg={activePage === "profil" ? "orange.500" : "white"}
                  color={activePage === "profil" ? "white" : "black"}
                  rounded="xl"
                  px={2}
                  py={5}
                  _hover={{
                    bg: activePage === "profil" ? "orange.600" : "gray.100",
                  }}
                  justifyContent="start"
                  onClick={() => setActivePage("profil")}
                >
                  <User
                    style={{ width: "24px", height: "24px" }}
                    color={activePage === "profil" ? "white" : "black"}
                  />
                  <Text
                    lineHeight="1"
                    whiteSpace="nowrap"
                    color={activePage === "profil" ? "white" : "black"}
                  >
                    Profil
                  </Text>
                </Button>

                <Button
                  size="sm"
                  width="full"
                  bg={activePage === "ubah-password" ? "orange.500" : "white"}
                  color={activePage === "ubah-password" ? "white" : "black"}
                  rounded="xl"
                  px={2}
                  py={5}
                  _hover={{
                    bg:
                      activePage === "ubah-password"
                        ? "orange.600"
                        : "gray.100",
                  }}
                  justifyContent="start"
                  onClick={() => setActivePage("ubah-password")}
                >
                  <PasswordCheck
                    style={{ width: "24px", height: "24px" }}
                    color={activePage === "ubah-password" ? "white" : "black"}
                  />
                  <Text
                    lineHeight="1"
                    whiteSpace="nowrap"
                    color={activePage === "ubah-password" ? "white" : "black"}
                  >
                    Ubah Password
                  </Text>
                </Button>

                <Button
                  size="sm"
                  width="full"
                  bg={activePage === "keluar" ? "orange.500" : "white"}
                  color={activePage === "keluar" ? "white" : "red"}
                  rounded="xl"
                  px={2}
                  py={5}
                  _hover={{
                    bg: activePage === "keluar" ? "orange.600" : "gray.100",
                  }}
                  justifyContent="start"
                  onClick={() => setActivePage("keluar")}
                >
                  <Logout
                    style={{ width: "24px", height: "24px" }}
                    color={activePage === "keluar" ? "white" : "red"}
                  />
                  <Text
                    lineHeight="1"
                    whiteSpace="nowrap"
                    color={activePage === "keluar" ? "white" : "red"}
                  >
                    Keluar
                  </Text>
                </Button>
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={3} className="flex flex-col">
            <Box
              bg="white"
              borderRadius="xl"
              padding={{ base: 4, lg: 6 }}
              boxShadow="0px 4px 30px rgba(0, 0, 0, 0.1)"
            >
              <Box display={{ base: "block", lg: "none" }}>
                <Button
                  size={"sm"}
                  bg="transparent"
                  rounded={"xl"}
                  px={0}
                  py={0}
                  border={"none"}
                  fontWeight="semibold"
                >
                  <ArrowLeft2
                    style={{ width: "24px", height: "24px" }}
                    color="black"
                  />
                  Ubah Password
                </Button>
              </Box>
              <Text
                textAlign={{ base: "start", lg: "start" }}
                fontSize={{ base: "16px", lg: "20px" }}
                fontWeight="bold"
                color="black"
                lineHeight={1}
                display={{ base: "none", lg: "block" }}
              >
                Ubah Password
              </Text>
              <Text
                textAlign={{ base: "start", lg: "start" }}
                fontSize={{ base: "12px", lg: "16px" }}
                fontWeight={"regular"}
                color="gray.400"
                marginY={"12px"}
                display={{ base: "none", lg: "block" }}
              >
                Kelola informasi profil Anda untuk mengontrol, melindungi dan
                mengamankan akun
              </Text>
              <Grid className="grid lg:grid-cols-3 sm:grid-rows-1">
                <GridItem colSpan={2}>
                  <VStack paddingY={6} gap={4}>
                    <InputWithLogo
                      id="new-password"
                      label="Masukkan Password Baru"
                      type="password"
                      icon={Lock}
                    />
                    <InputWithLogo
                      id="confirm-new-password"
                      label="Konfirmasi Password Baru"
                      type="password"
                      icon={Lock}
                    />
                    <Button
                      size={"sm"}
                      width={"max-content"}
                      bg={"orange.500"}
                      color={"white"}
                      rounded={"xl"}
                      px={5}
                      py={5}
                      _hover={{ bg: "orange.600" }}
                      alignSelf={{ base: "center", lg: "start" }}
                    >
                      <Text lineHeight="1" whiteSpace="nowrap">
                        Simpan Perubahan
                      </Text>
                    </Button>
                  </VStack>
                </GridItem>
              </Grid>
            </Box>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
