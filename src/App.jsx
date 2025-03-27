import ProductPage from "./pages/ProductPage";
import LandingPage from "./pages/LandingPage";


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
      <ProductPage />
    </div>
  );
}

export default App;
