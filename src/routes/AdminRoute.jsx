import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const validateAdmin = async () => {
      if (!token) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res?.data?.data?.role === "ADMIN") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    validateAdmin();
  }, []);

  if (checking) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
