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

import RoomTypesPage from './pages/RoomTypesPage'
import PublicRoomsPage from './pages/PublicRoomsPage'

// Bảo vệ đường dẫn
function ProtectedRoute({
  allow,          // boolean: điều kiện cho phép
  redirectTo, // đường dẫn khi không thỏa điều kiện
  children,
}) {
  if (!allow) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}


function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);  
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

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
          path="/auth/login"
          element={
            <ProtectedRoute allow={!isLoggedIn} redirectTo="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auth/register"
          element={
            <ProtectedRoute allow={!isLoggedIn} redirectTo="/">
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auth/resetPassword"
          element={
            <ProtectedRoute allow={!isLoggedIn} redirectTo="/">
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allow={isLoggedIn} redirectTo="/auth/login">
              <ProfilePage />,
            </ProtectedRoute>
          }
        />

        <Route 
          path="/play/roomType"
          element={<RoomTypesPage />}
        />

        <Route
          path="/play/publicRooms"
          element={<PublicRoomsPage />}
        />

      </Route>
      

      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  );
}

export default App
