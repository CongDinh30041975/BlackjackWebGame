import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import useAuthStore from './stores/authStore';

// Pages
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    // Khôi phục session từ Supabase khi app khởi động
    restoreSession();
  }, [restoreSession]);

  // Route chỉ cho phép truy cập khi chưa đăng nhập
  function PublicOnlyRoute({ children }) {
    const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
    if (isLoggedIn) return <Navigate to="/" replace />;
    return children;
  }


  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} >
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
      </Route>
      

      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  );
}

export default App
