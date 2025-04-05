import { Button } from "@chakra-ui/react";

/**
 * Reusable Filter Button
 * @param {{label: string, isActive?: boolean, onClick?: () => void}} props
 */
const FilterButton = ({ label, isActive = false, onClick }) => {
  return (
    <Button
      borderRadius="lg"
      px="1.25rem"
      py="1.25rem"
      bg={isActive ? "#F77E21" : "orange.100"}
      color={isActive ? "white" : "#F77E21"}
      fontWeight="semibold"
      _hover={{
        bg: isActive ? "#F77E21" : "orange.200",
      }}
      onClick={onClick}
      boxShadow="none"
    >
      {label}
    </Button>
  );
};

export default FilterButton;
