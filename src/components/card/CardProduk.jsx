import { Card, Image, Text, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ShoppingCart } from "@phosphor-icons/react";
import { Star } from "@phosphor-icons/react";

export default function CardProduk() {
  return (
    <Card.Root
      maxW="sm"
      overflow="hidden"
      bg="white"
      borderStyle={"solid"}
      borderColor={"gray.100"}
      borderRadius={16}
      boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
    >
      <Image
        className="w-64 h-48"
        maxH={192}
        src="https://www.astronauts.id/blog/wp-content/uploads/2022/08/Makanan-Khas-Daerah-tiap-Provinsi-di-Indonesia-Serta-Daerah-Asalnya.jpg"
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title textStyle={"md"} color="black" maxW={208}>
          Mendoan Sawangan hraaras asdanasd
        </Card.Title>
        <HStack style={{ gap: "1px" }}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <Star
                key={i}
                size={16}
                color={i < 4 ? "#FFA500" : "#ccc"}
                weight="fill"
              />
            ))}
          <Text color={"gray.800"} textStyle={"xs"}>
            4.5
          </Text>
        </HStack>
        <Text
          color="black"
          textStyle="2xl"
          fontWeight="medium"
          letterSpacing="tight"
        >
          Rp 450.000
        </Text>
      </Card.Body>
      <Card.Footer className="flex justify-end">
        <Button
          size={"sm"}
          bg={"orange.500"}
          borderRadius={"lg"}
          px={4}
          py={4}
          _hover={{ bg: "orange.600" }}
          border={"none"}
        >
          <ShoppingCart
            style={{ width: "24px", height: "24px" }}
            color="white"
          />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
