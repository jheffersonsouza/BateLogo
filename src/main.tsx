import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from './pages/App.tsx';
import Setup from './pages/Setup.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path='setup' element={<Setup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
