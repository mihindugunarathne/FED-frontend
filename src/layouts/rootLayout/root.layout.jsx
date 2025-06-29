import Navigation from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default RootLayout;
