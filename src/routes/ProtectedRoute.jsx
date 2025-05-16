import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        setChecking(false);
        return;
      }

      try {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(true);
      } catch (err) {
        localStorage.removeItem("token");
        setIsValid(false);
      } finally {
        setChecking(false);
      }
    };

    validateToken();
  }, []);

  if (checking) return null;
  if (!isValid) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
