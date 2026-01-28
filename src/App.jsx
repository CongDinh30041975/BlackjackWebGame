import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route path="/" element={<DashboardPage />}>
        {/* Các trang trên top nav */}
        <Route path="/RegisterPage" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<DashboardPage />} />
      
    </Routes>
  );
}

export default App
