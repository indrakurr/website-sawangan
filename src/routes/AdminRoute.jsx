// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const role = JSON.parse(atob(token?.split(".")[1] || ""))?.role;

  if (!token) return <Navigate to="/login" replace />;
  if (role !== "ADMIN") return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
