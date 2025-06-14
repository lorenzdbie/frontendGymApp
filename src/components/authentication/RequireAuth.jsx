import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Loader from "/src/components/Loader.jsx";

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader loading />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
}
