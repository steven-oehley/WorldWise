import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
