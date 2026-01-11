import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLogin, loading } = useAuth();

  if (loading) return null;

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
