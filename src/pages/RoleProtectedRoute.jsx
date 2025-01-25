import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RoleProtectedRoute({ children }) {
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") navigate("/");
  }, [role, navigate]);

  return role === "admin" ? children : null;
}

export default RoleProtectedRoute;
