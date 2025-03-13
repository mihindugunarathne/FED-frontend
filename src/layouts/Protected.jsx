import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}

export default Protected;
