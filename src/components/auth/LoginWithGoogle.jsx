import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toaster } from "../ui/toaster";

export default function LoginWithGoogle({ onSuccessLogin }) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        type: "standard",
        width: "100%",
      });
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const idToken = response.credential;
    try {
      const res = await axios.post(
        "https://sawanganserver-production.up.railway.app/api/v1/auth/google",
        { token: idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      toaster.success({ title: "Login dengan Google berhasil" });
      if (onSuccessLogin) onSuccessLogin();
      navigate("/");
    } catch (err) {
      toaster.error({
        title: "Gagal login Google",
        description:
          err?.response?.data?.errors || "Terjadi kesalahan saat login",
      });
    }
  };

  return <div style={{ width: "100%" }} ref={buttonRef}></div>;
}
