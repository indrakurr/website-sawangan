import ProductPage from "./pages/ProductPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage"
import ProductDetail from "./pages/ProductDetail";
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"


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
      <LoginPage />
    </div>
  );
}

export default App;
