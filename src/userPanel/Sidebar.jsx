import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Routers } from "../constants/router";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { MdPassword } from "react-icons/md";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: Routers.dashboard, icon: <LayoutDashboard size={20} /> },
    { name: "My Orders", path: Routers.myOrders, icon: <ShoppingBag size={20} /> },
    { name: "Address Book", path: Routers.addressBook, icon: <Phone size={20} /> },
    { name: "Change Password", path: Routers.changePassword, icon: <MdPassword size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4  bg-gray-700  text-white p-2 rounded "
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`
          bg-gray-50 text-gray-800 rounded-r-4xl border-[#f45b7a] border-2 flex-shrink-0 transition-all duration-300 relative mt-1
          ${isOpen ? "w-64" : "w-20"}
          hidden md:block
        `}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="text-xl font-bold">User Information</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-gray-300 transition md:block hidden"
          >
            {isOpen ? <IoIosArrowDropleftCircle size={20} /> : <IoIosArrowDroprightCircle size={20} />}
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 hover:bg-[#f38ca1] transition-colors rounded-2xl ${
                location.pathname === item.path ? "bg-[#eda5b4] font-semibold rounded-2xl" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <aside className="w-64 bg-gray-50 border-[#f45b7a] border-r rounded-r-2xl border-2 text-black p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold">User Information</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded hover:bg-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 p-4 hover:bg-[#fbc4cf] transition-colors  rounded-2xl${
                    location.pathname === item.path ? "bg-[#f4a3b3] font-semibold rounded-2xl" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          <div
            className="flex-1  bg-opacity-50"
            onClick={() => setIsMobileOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
