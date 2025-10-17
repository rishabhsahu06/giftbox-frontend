import { Outlet } from "react-router-dom";
import Navbar from "../landingPage/Navbar";
import Footer from "../landingPage/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
