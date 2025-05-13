import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toaster } from "../ui/toaster";

export default function LoginWithGoogle({ onSuccessLogin, text = "signup_with" }) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_BASE_URL;

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
        text,
      });
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const idToken = response.credential;

    try {
      const res = await axios.post(
        `${API}/auth/google`,
        { access_token: idToken }, // ✅ match dengan Postman
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      toaster.success({ title: "Login dengan Google berhasil" });
      onSuccessLogin?.();
    } catch (err) {
      console.error("Login Google Gagal:", err.response?.data);
      toaster.error({
        title: "Gagal login Google",
        description:
          err?.response?.data?.errors || "Terjadi kesalahan saat login.",
      });
    }
  };
  

  return <div style={{ width: "100%" }} ref={buttonRef}></div>;
}
