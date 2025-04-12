import { useState } from "react";
import { Text } from "@chakra-ui/react";
import SideBar from "../components/navigation/SideBar";

export default function Dashboard() {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="flex bg-gray-400">
      <SideBar collapse={collapse} setCollapse={setCollapse} />
      <div
        className="flex-1 p-8 ml-[96px] transition-all duration-300"
        style={{ marginLeft: collapse ? "96px" : "312px" }}
      >
        <Text className="text-2xl font-bold mb-4">Selamat Datang di Dashboard</Text>
        <p className="text-gray-700">
          Ini adalah halaman utama dashboard. Kamu bisa menambahkan konten di
          sini nanti.
        </p>
      </div>
    </div>
  );
}
