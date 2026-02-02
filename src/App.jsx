import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import useAuthStore from './stores/authStore';

// Pages
import IntroducePage from './pages/IntroducePage'
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProfilePage from "./pages/ProfilePage";

// Route chỉ cho phép truy cập khi chưa đăng nhập
function PublicOnlyRoute({ children }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

// Route chỉ cho phép truy cập khi đã đăng nhập
function PrivateOnlyRoute({ children }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);  

  useEffect(() => {
    // Khôi phục session từ Supabase khi app khởi động
    restoreSession();
  }, [restoreSession]);

  return (
    <Routes>
      <Route element={<DashboardPage />} >
        <Route
          path="/"
          element={
            <IntroducePage />
          }
        />


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

          <Route
            path="/resetPassword"
            element={
              <PublicOnlyRoute>
                <ResetPasswordPage />
              </PublicOnlyRoute>
            }
          />

        <Route
          path="/profile"
          element={
            <PrivateOnlyRoute>
              <ProfilePage />
            </PrivateOnlyRoute>
          }
        />
      </Route>
      

      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  );
}

export default App
