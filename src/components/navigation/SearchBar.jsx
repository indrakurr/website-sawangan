import {
  Input,
  InputGroup,
  Flex,
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Category2, ArrowDown2 } from "iconsax-react";

export default function SearchBar() {

  return (
    <Flex
      position="fixed"
      top={{ base: "60px", lg: "65px" }}
      left="0"
      w="full"
      bg="white"
      px={{ base: "30px", lg: "240px" }}
      py="12px"
      zIndex="60"
      borderTop={1}
      borderStyle={"solid"}
      borderColor={"#CACACA"}
      gap={{ base: "16px", lg: "60px" }}
    >
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            backgroundColor={"transparent"}
            size="sm"
            border={"none"}
            _focusVisible={{ outline: "none", boxShadow: "none" }}
          >
            <Category2 color="black" /> Kategori <ArrowDown2 color="black" />
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
                Makanan
              </Menu.Item>
              <Menu.Item
                color="black"
                value="new-file"
                _hover={{ bg: "#FFFEE5" }}
              >
                Minuman
              </Menu.Item>
              <Menu.Item
                color="black"
                value="new-win"
                _hover={{ bg: "#FFFEE5" }}
              >
                Aksesoris
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <InputGroup
        flex="1"
        startElement={<MagnifyingGlass size={"20px"} color="black" />}
        background={"white"}
        borderRadius={"12px"}
        border="solid"
        borderWidth="1px"
        borderColor={"#E2E8F0"}
      >
        <Input
          placeholder="Cari oleh-oleh disini!"
          color={"black"}
          borderRadius={"12px"}
          bg="white"
          borderColor={"#E2E8F0"}
          border={"none"}
          focusBorderColor="transparent"
          _placeholder={{ color: "black" }}
        />
      </InputGroup>
    </Flex>
  );
}
