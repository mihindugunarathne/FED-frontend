import AdminNavigation from "@/components/AdminNavigation";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
}

export default AdminLayout;