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

const TABLEHEADS = ["No", "Nama Produk", "Harga", "Kategori", "Stok", "Aksi"];

const dummyProducts = [
  {
    id: 1,
    name: "Getuk Goreng Sokaraja",
    price: "Rp12.000",
    category: "Makanan",
    stock: 20,
  },
  {
    id: 2,
    name: "Wedang Uwuh",
    price: "Rp15.000",
    category: "Minuman",
    stock: 10,
  },
  {
    id: 3,
    name: "Gelang Batik",
    price: "Rp25.000",
    category: "Aksesoris",
    stock: 8,
  },
  {
    id: 4,
    name: "Nopia Khas Banyumas",
    price: "Rp18.000",
    category: "Makanan",
    stock: 30,
  },
  {
    id: 5,
    name: "Teh Serai Wangi",
    price: "Rp13.000",
    category: "Minuman",
    stock: 14,
  },
  {
    id: 6,
    name: "Kaos I Love Purwokerto",
    price: "Rp45.000",
    category: "Aksesoris",
    stock: 12,
  },
  {
    id: 7,
    name: "Kripik Tempe",
    price: "Rp10.000",
    category: "Makanan",
    stock: 40,
  },
  {
    id: 8,
    name: "Sirup Jahe Merah",
    price: "Rp22.000",
    category: "Minuman",
    stock: 18,
  },
  {
    id: 9,
    name: "Dompet Batik",
    price: "Rp30.000",
    category: "Aksesoris",
    stock: 6,
  },
  {
    id: 10,
    name: "Jenang Kudus",
    price: "Rp17.000",
    category: "Makanan",
    stock: 25,
  },
  {
    id: 11,
    name: "Kopi Banyumas",
    price: "Rp27.000",
    category: "Minuman",
    stock: 13,
  },
  {
    id: 12,
    name: "Topi Anyaman",
    price: "Rp35.000",
    category: "Aksesoris",
    stock: 7,
  },
  {
    id: 13,
    name: "Rengginang Pedas",
    price: "Rp11.000",
    category: "Makanan",
    stock: 22,
  },
  {
    id: 14,
    name: "Teh Hitam Celup",
    price: "Rp19.000",
    category: "Minuman",
    stock: 16,
  },
  {
    id: 15,
    name: "Gantungan Kunci Miniatur Poci",
    price: "Rp8.000",
    category: "Aksesoris",
    stock: 50,
  },
];

export function TableProductList({
  currentPage = 1,
  itemsPerPage = 10,
  products = [],
}) {
  const handleBadgeColor = (category) => {
    switch (category.toLowerCase()) {
      case "makanan":
        return "yellow";
      case "minuman":
        return "blue";
      case "aksesoris":
        return "green";
      default:
        return "gray";
    }
  };

  // Hitung data yang ditampilkan di halaman sekarang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <BaseTable data={displayedProducts} heads={TABLEHEADS}>
      {displayedProducts.map((item, index) => (
        <TableBodyRow key={item.id} index={index}>
          <CenteredCell>
            {(currentPage - 1) * itemsPerPage + index + 1}
          </CenteredCell>
          <TextCell content={item.name} />
          <TextCell content={item.price} />
          <BadgeCell
            content={item.category}
            colorScheme={handleBadgeColor(item.category)}
          />
          <LeftAlignCell>{item.stock}</LeftAlignCell>
          <CenteredCell>
            <IconButton variant="ghost" _hover={{ bg: "transparent" }}>
              <Edit2 color="black" />
            </IconButton>
            <IconButton variant="ghost" _hover={{ bg: "transparent" }}>
              <Trash color="red" />
            </IconButton>
          </CenteredCell>
        </TableBodyRow>
      ))}
    </BaseTable>
  );
}

