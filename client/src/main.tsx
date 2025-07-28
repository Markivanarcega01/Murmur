import { StrictMode } from 'react'
import { BrowserRouter } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  //</StrictMode>,
)
