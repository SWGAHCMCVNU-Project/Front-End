import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/App.scss";
import "./assets/styles/responsive.scss";
import GlobalStyles from "./styles/GlobalStyles.js"; // Import GlobalStyles
import App from "./App.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
