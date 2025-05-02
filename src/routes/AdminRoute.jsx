import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");

  // 1. Jika belum login sama sekali, arahkan ke login admin
  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // 2. Jika sudah login tapi bukan admin
    if (payload.role !== "ADMIN") {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (e) {
    // 3. Jika token tidak valid (corrupt atau tidak bisa di-decode)
    return <Navigate to="/admin/login" replace />;
  }

  // 4. Jika semuanya aman
  return <Outlet />;
}
