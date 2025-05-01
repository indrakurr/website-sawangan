import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOauthGoogleMutation } from "../store/store";
import { toaster, Toaster } from "../components/ui/toaster";

export default function OauthCallback() {
  const navigate = useNavigate();
  const [oauthGoogle] = useOauthGoogleMutation();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      (async () => {
        try {
          const res = await oauthGoogle({ token: code }).unwrap(); // token = authorization code
          localStorage.setItem("token", res.token);

          toaster.success("Login Google Berhasil", {
            duration: 2000,
            position: "top-center",
            style: { color: "#fff" },
          });

          navigate("/");
        } catch (err) {
          toaster.error("Login Google Gagal", {
            description: err?.data?.errors || "Terjadi kesalahan saat login.",
            duration: 3000,
            position: "top-center",
            style: { color: "#fff" },
          });
          navigate("/login");
        }
      })();
    } else {
      toaster.error("Kode Google tidak ditemukan");
      navigate("/login");
    }
  }, []);

  return <Toaster />;
}
