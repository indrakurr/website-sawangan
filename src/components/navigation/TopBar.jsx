import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, Text, Portal, Menu, Link } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { ArrowDown2, Logout, SidebarLeft, SidebarRight } from "iconsax-react";
import { House } from "@phosphor-icons/react";
import { useLogoutMutation, useGetProfileQuery } from "../../store/store";
import { Link as RouterLink } from "react-router-dom";

export default function TopBar({ collapse, setCollapse }) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const { data, isLoading } = useGetProfileQuery();
  const profile = data?.data;

  const handleLogout = async () => {
    const toastId = toaster.loading({
      title: "Sedang keluar...",
      duration: 4000,
    });
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      localStorage.removeItem("token");
      toaster.success({ title: "Berhasil Logout" });
      navigate("/admin/login");
      toaster.dismiss(toastId);
    }
  };

  return (
    <Box
      bg="white"
      w="100%"
      px={8}
      py={6}
      transition="all 0.3s ease"
      boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.05)"}
    >
      <Flex justifyContent="space-between" align="center">
        <Box onClick={() => setCollapse(!collapse)} cursor="pointer">
          {collapse ? (
            <SidebarRight color="gray" size="24px" />
          ) : (
            <SidebarLeft color="gray" size="24px" />
          )}
        </Box>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex gap="4px" align="center" cursor="pointer">
              <Image
                boxSize="36px"
                borderRadius="full"
                src={
                  profile?.avatar ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile?.fullName || "Admin")
                }
                alt="profile-image"
              />
              <Box marginLeft={3}>
                <Text
                  fontSize="14px"
                  fontWeight="semibold"
                  color="black"
                  wordBreak="break-word"
                >
                  {profile?.fullName || "-"}
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight="regular"
                  color="gray.400"
                  wordBreak="break-word"
                >
                  {profile?.email || "-"}
                </Text>
              </Box>
              <ArrowDown2 color="black" size="16px" />
            </Flex>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content
                padding="12px"
                borderRadius="12px"
                backgroundColor="white"
                boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
              >
                <Menu.Item
                  asChild
                  paddingY={2}
                  borderRadius="md"
                  _hover={{ bg: "gray.100" }}
                >
                  <Link as={RouterLink} to="/">
                    <Flex align="center" gap={2}>
                      <House size={20} color="black" />
                      <Text fontSize="14px" color="black">
                        Kembali ke beranda
                      </Text>
                    </Flex>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  color="red"
                  value="logout"
                  borderRadius={"md"}
                  _hover={{ bg: "gray.100" }}
                  paddingY={2}
                  onClick={handleLogout}
                >
                  <Logout
                    style={{ width: "20px", height: "20px" }}
                    color="red"
                  />
                  Keluar
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </Box>
  );
}
