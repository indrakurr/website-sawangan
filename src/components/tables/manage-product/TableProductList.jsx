import { IconButton } from "@chakra-ui/react";
import { BaseTable } from "../base-table/BaseTable";
import {
  CenteredCell,
  TextCell,
  BadgeCell,
  LeftAlignCell,
} from "../base-table/TableCells";
import { Edit2, Trash } from "iconsax-react";
import { TableBodyRow } from "../base-table/TableRows";
import ModalEditProduct from "../../modal/manage-product/ModalEditProduct";
import ModalDeleteProduct from "../../modal/manage-product/ModalDeleteProduct"; 
import { useState } from "react";

const TABLEHEADS = ["No", "Nama Produk", "Harga", "Kategori", "Stok", "Aksi"];

export function TableProductList({
  currentPage = 1,
  itemsPerPage = 10,
  products = [],
  refetch,
}) {
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const handleBadgeColor = (category) => {
    switch (category.toLowerCase()) {
      case "makanan":
        return "yellow2";
      case "minuman":
        return "blue2";
      case "aksesoris":
        return "green2";
      default:
        return "gray";
    }
  };

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <BaseTable data={displayedProducts} heads={TABLEHEADS}>
        {displayedProducts.map((item, index) => (
          <TableBodyRow key={item.id} index={index}>
            <CenteredCell>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </CenteredCell>
            <TextCell content={item.name} />
            <TextCell content={`Rp ${item.price.toLocaleString("id-ID")}`} />
            <BadgeCell
              content={item.category}
              colorScheme={handleBadgeColor(item.category)}
            />
            <LeftAlignCell>{item.stock}</LeftAlignCell>
            <CenteredCell>
              <IconButton
                variant="ghost"
                _hover={{ bg: "transparent" }}
                onClick={() => {
                  setSelectedProductId(item.id);
                  setIsOpenEdit(true);
                }}
              >
                <Edit2 color="black" />
              </IconButton>
              <IconButton
                variant="ghost"
                _hover={{ bg: "transparent" }}
                onClick={() => {
                  setSelectedProductId(item.id);
                  setIsOpenDelete(true);
                }}
              >
                <Trash color="red" />
              </IconButton>
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>

      {/* Modal Edit */}
      <ModalEditProduct
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        productId={selectedProductId}
        onSuccess={() => refetch()}
      />

      {/* Modal Delete */}
      <ModalDeleteProduct
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        productId={selectedProductId}
        onSuccess={() => refetch()}
      />
    </>
  );
}
