import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Routers } from "../constants/router";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    [Routers.dashboard]: "Dashboard",
    [Routers.myOrders]: "My Orders",
    [Routers.addressBook]: "Address Book",
    [Routers.changePassword]: "Change Password",
  };

  const activePage = pageTitles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <header className="bg-white shadow px-5 a md:px-14 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold hidden md:block">{activePage}</h1>

      <div className="flex items-center gap-6 ml-auto">
        <button
          onClick={() => navigate("/")}
          className=" bg-[#432DD7] text-white px-3 py-1 rounded hover:bg-[#554d87]  cursor-pointer"
        >
          <span className="">Continue Shopping</span>
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center justify-center md:justify-start cursor-pointer"
        >
          {/* Show icon only on small screens */}
          <LogOut className="w-5 h-5 md:hidden" />

          {/* Show text only on medium and up screens */}
          <span className="hidden md:inline ml-2">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
