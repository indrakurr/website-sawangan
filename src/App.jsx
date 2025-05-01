import { Routes, Route } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ProductDetail from "./pages/ProductDetail";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import NewPassword from "./pages/NewPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrder from "./pages/MyOrder";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/admin/Dashboard";
import ManageProduct from "./pages/admin/ManageProduct";
import ManageOrder from "./pages/admin/ManageOrder";
import ManageUser from "./pages/admin/ManageUser";
import OauthCallback from "./pages/OauthCallback";

function App() {
  return (
    <div
      style={{
        minWidth: "100vw",
        overflowX: "hidden",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/produk" element={<ProductPage />} />
        <Route path="/produk/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifikasi" element={<Verification />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/keranjang" element={<Cart />} />
        <Route path="/pembayaran" element={<Checkout />} />
        <Route path="/pesanan-saya" element={<MyOrder />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/ubah-password" element={<ChangePassword />} />
        <Route path="/auth/callback" element={<OauthCallback />} />
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/produk" element={<ManageProduct />} />
        <Route path="/dashboard/pesanan" element={<ManageOrder />} />
        <Route path="/dashboard/pengguna" element={<ManageUser />} />
      </Routes>
    </div>
  );
}

export default App;
