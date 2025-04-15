// components/navigation/TopBar.jsx
import { Box, Flex, Image, Text, Portal, Menu } from "@chakra-ui/react";
import { ArrowDown2, Logout } from "iconsax-react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-iconly";

export default function TopBar({ collapse, setCollapse }) {
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
            <ArrowRightSquare color="gray" size="32px" />
          ) : (
            <ArrowLeftSquare color="gray" size="32px" />
          )}
        </Box>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Flex gap="4px" align="center" cursor="pointer">
              <Image
                boxSize="36px"
                borderRadius="full"
                src="https://i.pravatar.cc/300?u=111"
                alt="profile-image"
              />
              <Box marginLeft={3}>
                <Text
                  fontSize="14px"
                  fontWeight="semibold"
                  color="black"
                  wordBreak="break-word"
                >
                  Lorem Ipsum
                </Text>
                <Text
                  fontSize="12px"
                  fontWeight="regular"
                  color="gray.400"
                  wordBreak="break-word"
                >
                  loremipsum@gmail.com
                </Text>
              </Box>
              <ArrowDown2 color="black" size="16px" />
            </Flex>
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
                  color="red"
                  value="logout"
                  _hover={{ bg: "white" }}
                  padding={0}
                >
                  <Logout
                    style={{ width: "24px", height: "24px" }}
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
