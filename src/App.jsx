import ProductPage from "./pages/ProductPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage"
import ProductDetail from "./pages/ProductDetail";
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import NewPassword from "./pages/NewPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrder from "./pages/MyOrder";


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
      <MyOrder />
    </div>
  );
}

export default App;
