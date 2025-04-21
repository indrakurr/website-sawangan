import { IconButton } from "@chakra-ui/react";
import { BaseTable } from "../base-table/BaseTable";
import {
  CenteredCell,
  TextCell,
  LeftAlignCell,
} from "../base-table/TableCells";
import { Eye, Trash } from "iconsax-react";
import { TableBodyRow } from "../base-table/TableRows";

const TABLEHEADS = ["No", "Nama Lengkap", "Email", "Nomor Telepon", "Aksi"];

export function TableUserList({
  currentPage = 1,
  itemsPerPage = 10,
  users = [],
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  return (
    <BaseTable data={displayedUsers} heads={TABLEHEADS}>
      {displayedUsers.map((user, index) => (
        <TableBodyRow key={user.id} index={index}>
          <CenteredCell>
            {(currentPage - 1) * itemsPerPage + index + 1}
          </CenteredCell>
          <TextCell content={user.fullName} />
          <TextCell content={user.email} />
          <LeftAlignCell>{user.phone}</LeftAlignCell>
          <CenteredCell>
            <IconButton variant="ghost" _hover={{ bg: "transparent" }} ml={2}>
              <Trash color="red" />
            </IconButton>
          </CenteredCell>
        </TableBodyRow>
      ))}
    </BaseTable>
  );
}
