import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";

// UI / Theme Provider (Chakra / Tailwind / etc.)
import { Provider as UIProvider } from "./components/ui/provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <UIProvider>
          <App />
        </UIProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
