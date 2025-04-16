import { Input, InputGroup } from "@chakra-ui/react";
import { Search } from "react-iconly";

/**
 * Search bar component (Chakra UI v3+)
 * @param {{ onSearch: (value: string) => void, maxLength: number, className: string, value: string }} props
 */
export default function SearchInput({ onSearch, maxLength = 25, className, value }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <InputGroup
      className={className}
      w="full"
      h="full"
      startElement={<Search size={18} primaryColor="#828282" />}
    >
      <Input
        type="text"
        placeholder="Cari di sini..."
        _placeholder={{ color: "#828282" }}
        borderRadius="xl"
        color="black"
        borderColor="#C4C4C4"
        px="2.5rem"
        onChange={handleSearch}
        maxLength={maxLength}
        value={value}
      />
    </InputGroup>
  );
}
