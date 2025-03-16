import Navigation from "../components/Navigation";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default MainLayout;
