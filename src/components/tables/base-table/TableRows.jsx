import { Table } from "@chakra-ui/react";

/**
 * Row for table head
 * @param {{ heads: string[], textAligns: string[] }} props
 */
export function TableHeadRow({ heads, textAligns }) {
  return (
    <Table.Row>
      {heads.map((head, index) => (
        <Table.ColumnHeader
          key={head}
          textAlign={textAligns[index]}
          color="#7F7F7F"
          bg="white"
          textTransform="capitalize"
          fontSize=""
          width={
            index === 0 ? "5%" : index === heads.length - 1 ? "10%" : undefined
          }
        >
          {head}
        </Table.ColumnHeader>
      ))}
    </Table.Row>
  );
}

/**
 * Row for table body
 * @param {{ index: number, children: React.ReactNode }} props
 */
export function TableBodyRow({ index, children }) {
  return (
    <Table.Row
      bg={index % 2 === 0 ? "#F2F2F5" : "white"}
      borderBlock="2px solid #E0E0E0"
      _hover={{ bg: "#FFFDDF" }}
    >
      {children}
    </Table.Row>
  );
}
