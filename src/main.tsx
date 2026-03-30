import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/jpeg";
icon.href = `${import.meta.env.BASE_URL}capy.jpg`;
document.head.appendChild(icon);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
