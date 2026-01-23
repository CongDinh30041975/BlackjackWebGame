import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<DashboardPage />} />
    </Routes>
  );
}

export default App
