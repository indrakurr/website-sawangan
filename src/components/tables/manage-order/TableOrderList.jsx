import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { BaseTable } from "../base-table/BaseTable";
import {
  CenteredCell,
  TextCell,
  BadgeCell,
  LeftAlignCell,
} from "../base-table/TableCells";
import { Show } from "react-iconly";
import { TableBodyRow } from "../base-table/TableRows";
import ModalManageOrderPending from "../../modal/manage-order/ModalManageOrderPending";
import { useGetAdminOrderByIdQuery } from "../../../store/store";

const TABLEHEADS = [
  "No",
  "ID Pesanan",
  "Nama Produk",
  "Nama Pembeli",
  "Total",
  "Status",
  "Aksi",
];

export function TableOrderList({
  currentPage = 1,
  itemsPerPage = 10,
  orders = [],
}) {
  const handleBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "belum bayar":
        return "yellow";
      case "dikemas":
        return "azure";
      case "dikirim":
        return "blue";
      case "diterima":
        return "green";
      case "dibatalkan":
        return "red";
      default:
        return "gray";
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedOrders = orders.slice(startIndex, endIndex);

  const truncateId = (id) => (id.length > 7 ? `${id.slice(0, 7)}...` : id);

  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { data: selectedOrderData } = useGetAdminOrderByIdQuery(
    selectedOrderId,
    {
      skip: !selectedOrderId,
    }
  );
  

  return (
    <>
      <BaseTable data={displayedOrders} heads={TABLEHEADS}>
        {displayedOrders.map((item, index) => (
          <TableBodyRow key={item.id} index={index}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </CenteredCell>
            <TextCell content={truncateId(item.id)} />
            <LeftAlignCell>
              <ul style={{ paddingLeft: "1rem", listStyle: "disc" }}>
                {item.items.map((prod, idx) => (
                  <li key={idx}>{prod.name}</li>
                ))}
              </ul>
            </LeftAlignCell>

            <TextCell content={item.customerName} />
            <LeftAlignCell>{item.total}</LeftAlignCell>
            <BadgeCell
              content={item.status}
              colorScheme={handleBadgeColor(item.status)}
            />
            <CenteredCell>
              <IconButton
                variant="ghost"
                _hover={{ bg: "transparent" }}
                onClick={() => {
                  setSelectedOrderId(item.id);
                  setIsOpenView(true);
                }}
              >
                <Show color="black" />
              </IconButton>
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
      <ModalManageOrderPending
        isOpen={isOpenView}
        onClose={() => {
          setIsOpenView(false);
          setSelectedOrderId(null);
        }}
        order={selectedOrderData?.data}
      />
    </>
  );
}
