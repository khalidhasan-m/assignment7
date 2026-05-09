import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="bg-base-200">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
