import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

function AdminProtected() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('Admin check:', {
        userId: user?.id,
        role: user?.publicMetadata?.role,
        metadata: user?.publicMetadata,
        sessionId: user?.sessionId
      });
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
    console.log('Admin access denied', {
      isSignedIn,
      role: user?.publicMetadata?.role
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminProtected;
