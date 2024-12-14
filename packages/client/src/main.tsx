import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GenericHeader from './components/generic-header/GenericHeader.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<App />} />
          <Route path="/:headerTitle/:name" element={<GenericHeader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
