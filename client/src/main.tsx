import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyStateProvider } from "./context/selectedContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CssBaseline />
      <MyStateProvider>
        <App />
      </MyStateProvider>
    </BrowserRouter>
  </QueryClientProvider>
  //</StrictMode>,
);
