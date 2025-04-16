import { Table } from "@chakra-ui/react";
import { TableBodyRow ,TableHeadRow } from "./TableRows";
import { NotFoundCell } from "./TableCells";

/**
 * Base table component
 * @param {{ data: any[], heads: string[], children: React.ReactNode, textAligns?: string[] }} props
 */
export function BaseTable({ data, heads, children, textAligns }) {
  const resolvedTextAligns =
    textAligns ||
    heads.map((_, index) =>
      index === 0 || index === heads.length - 1 ? "center" : "left"
    );

  return (
    <Table.Root>
      <Table.Header>
        <TableHeadRow heads={heads} textAligns={resolvedTextAligns} />
      </Table.Header>
      <Table.Body>
        {data.length === 0 ? (
          <TableBodyRow index={0}>
            <NotFoundCell count={heads.length} />
          </TableBodyRow>
        ) : (
          children
        )}
      </Table.Body>
    </Table.Root>
  );
}
