import { Card, Image, Text, HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ShoppingCart } from "@phosphor-icons/react";
import { Star } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function CardProduk({product}) {
if (!product) return null;

  const { id, name, imageUrl, ratingAvg=0 , price } = product;
  
  return (
    <Link to={`/products/${id}`}>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        bg="white"
        borderStyle={"solid"}
        borderColor={"gray.100"}
        borderRadius={16}
        boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.1)"}
      >
        <Image className="w-64 h-48" maxH={192} src={imageUrl} alt={name} />
        <Card.Body gap="2">
          <Card.Title textStyle={"md"} color="black" maxW={208}>
            {name}
          </Card.Title>
          <HStack style={{ gap: "1px" }}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={i < Math.round(ratingAvg) ? "#FFA500" : "#ccc"}
                  weight="fill"
                />
              ))}
            <Text color={"gray.800"} textStyle={"xs"}>
              {ratingAvg.toFixed(1)}
            </Text>
          </HStack>
          <Text
            color="black"
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
          >
            Rp {price.toLocaleString("id-ID")}
          </Text>
        </Card.Body>
        <Card.Footer className="flex justify-end">
          <Button
            size={"sm"}
            bg={"orange.500"}
            rounded={"xl"}
            px={4}
            py={4}
            _hover={{ bg: "orange.600" }}
            border={"none"}
            onClick={(e) => e.preventDefault()}
          >
            <ShoppingCart
              style={{ width: "24px", height: "24px" }}
              color="white"
            />
          </Button>
        </Card.Footer>
      </Card.Root>
    </Link>
  );
}
