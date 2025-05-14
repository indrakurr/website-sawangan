// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
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
import LoginAdmin from "./pages/admin/LoginAdmin";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

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
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifikasi" element={<Verification />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes (User) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrder />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<ManageProduct />} />
          <Route path="/dashboard/orders" element={<ManageOrder />} />
          <Route path="/dashboard/users" element={<ManageUser />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;