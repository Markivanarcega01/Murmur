import { StrictMode } from 'react'
import { BrowserRouter } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <BrowserRouter>
    <CssBaseline/>
    <App />
  </BrowserRouter>
  //</StrictMode>,
)
