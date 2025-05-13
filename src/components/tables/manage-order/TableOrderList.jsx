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
import { useGetAdminOrderByIdQuery } from "../../../store/store";

// Import semua modal berdasarkan status
import ModalManageOrderPending from "../../modal/manage-order/ModalManageOrderPending";
import ModalManageOrderPacked from "../../modal/manage-order/ModalManageOrderPacked";
import ModalManageOrderShipped from "../../modal/manage-order/ModalManageOrderShipped";
import ModalManageOrderCompleted from "../../modal/manage-order/ModalManageOrderCompleted";
import ModalManageOrderCanceled from "../../modal/manage-order/ModalManageOrderCanceled";

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

  const renderModal = () => {
    const order = selectedOrderData?.data;
    const status = order?.status;

    if (!isOpenView || !order) return null;

    switch (status) {
      case "PENDING":
        return (
          <ModalManageOrderPending
            isOpen={isOpenView}
            onClose={() => {
              setIsOpenView(false);
              setSelectedOrderId(null);
            }}
            order={order}
          />
        );
      case "PACKAGED":
        return (
          <ModalManageOrderPacked
            isOpen={isOpenView}
            onClose={() => {
              setIsOpenView(false);
              setSelectedOrderId(null);
            }}
            order={order}
          />
        );
      case "SHIPPED":
        return (
          <ModalManageOrderShipped
            isOpen={isOpenView}
            onClose={() => {
              setIsOpenView(false);
              setSelectedOrderId(null);
            }}
            order={order}
          />
        );
      case "COMPLETED":
        return (
          <ModalManageOrderCompleted
            isOpen={isOpenView}
            onClose={() => {
              setIsOpenView(false);
              setSelectedOrderId(null);
            }}
            order={order}
          />
        );
      case "CANCELLED":
        return (
          <ModalManageOrderCanceled
            isOpen={isOpenView}
            onClose={() => {
              setIsOpenView(false);
              setSelectedOrderId(null);
            }}
            order={order}
          />
        );
      default:
        return null;
    }
  };

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

      {renderModal()}
    </>
  );
}
