import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute - Wrapper để bảo vệ các route cần authentication
 * Nếu user chưa đăng nhập, sẽ redirect về trang SignIn
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Nếu đang loading, hiển thị loading state
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Nếu chưa authenticate, redirect về SignIn
  if (!isAuthenticated) {
    return <Navigate to="/SignIn" replace />;
  }

  // Nếu đã authenticate, hiển thị component
  return children;
}
