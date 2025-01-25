import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

function AuthenticatedProtectedRoute({ children }) {
  const { id } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/login");
  }, [id, navigate]);

  return id ? children : null;
}

export default AuthenticatedProtectedRoute;
