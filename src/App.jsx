import ProductPage from "./pages/ProductPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage"


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
      <LandingPage />
    </div>
  );
}

export default App;
