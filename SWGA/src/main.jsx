
if (typeof global === "undefined") {
  window.global = window;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { StrictMode } from "react";
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import favicon from "./assets/images/S_WalletLogo.png";
import "./assets/styles/App.scss";
import "./assets/styles/responsive.scss";
import GlobalStyles from "./styles/GlobalStyles.js"; // Import GlobalStyles
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
const queryClient = new QueryClient();



const setFavicon = (iconUrl) => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = iconUrl;
  link.type = "image/png";
};

// Gọi hàm để set favicon
setFavicon(favicon);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStyles />
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
