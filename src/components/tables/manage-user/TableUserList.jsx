import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { BaseTable } from "../base-table/BaseTable";
import {
  CenteredCell,
  TextCell,
  LeftAlignCell,
} from "../base-table/TableCells";
import { Trash } from "iconsax-react";
import { TableBodyRow } from "../base-table/TableRows";
import ModalDeleteUser from "../../modal/manage-user/ModalDeleteUser";

const TABLEHEADS = ["No", "Nama Lengkap", "Email", "Nomor Telepon", "Aksi"];

export function TableUserList({
  currentPage = 1,
  itemsPerPage = 10,
  users = [],
  refetch,
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <>
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
              <IconButton
                variant="ghost"
                _hover={{ bg: "transparent" }}
                ml={2}
                onClick={() => {
                  setSelectedUserId(user.id);
                  setIsOpenDelete(true);
                }}
              >
                <Trash color="red" />
              </IconButton>
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
      <ModalDeleteUser
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        userId={selectedUserId}
        refetch={refetch}
      />
    </>
  );
}
