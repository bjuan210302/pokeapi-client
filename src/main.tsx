import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Login from './components/Login'
import Memes from './components/Memes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} >
          <Route path="memes" element={<Memes />} />
          <Route path="favourites" element={<div>FAV</div>} />
          <Route path="settings" element={<div>SETT</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
