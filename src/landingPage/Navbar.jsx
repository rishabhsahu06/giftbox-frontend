// src/components/NavbarMain.jsx
import React, { useState, useEffect } from "react";
import { Heart, User, Phone, Search, X, ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import logo from "../assets/logo1.png";
import NavbarBottom from "./NavbarBottom";

const NavbarMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setMobileOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleCartClick = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast("Please login to continue 🧑‍💻", { duration: 1500 });
      setTimeout(() => navigate("/login"), 600);
      return;
    }
    navigate("/cart");
  };

  return (
    <>
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-xl animate-fadeIn">
            <button
              onClick={() => setShowEnquiryModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              ✕
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
              Bulk Orders / Enquiry
            </h2>
            <p className="text-gray-700 mb-4">
              For bulk orders, special pricing, or detailed inquiries, contact us directly:
            </p>
            <div className="flex flex-col gap-3">
              <p className="font-medium text-gray-900">📞 Call: 9112233507</p>
              <p className="font-medium text-gray-900">✉️ Email: hetalsoapstory@gmail.com</p>
              <p className="font-medium text-gray-900">
                🕒 Availability: Mon-Sat 10AM - 6PM
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "tel:9112233507")}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Call Now
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="mx-auto md:px-9 px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center flex-shrink-0 cursor-pointer"
            >
              <img src={logo} alt="logo" className="block md:h-18 h-12 w-auto" />
            </button>

            {/* Search (Desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8 gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">9112233507</span>
              </div>

              <div className="flex items-center flex-1 bg-gray-100 rounded-md overflow-hidden border border-gray-200 focus-within:border-gray-400">
                <Search className="w-4 h-4 text-gray-800 ml-3" />
                <input
                  type="text"
                  placeholder="Search for Products"
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Bulk Orders / Enquiry */}
              <button
                onClick={() => setShowEnquiryModal(true)}
                className="relative hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg animate-bounce transition-all duration-300"
              >
                <span>Bulk Orders / Enquiry</span>
              </button>

              <button
                onClick={() =>
                  handleNavigation(isLoggedIn ? "/dashboard" : "/login")
                }
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {isLoggedIn ? "Profile" : "Login"}
                </span>
              </button>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                className="lg:hidden text-gray-700 hover:text-gray-900"
                onClick={() => setMobileOpen(true)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navbar */}
      <NavbarBottom
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isActiveNavItem={(href) => location.pathname === href}
        setShowEnquiryModal={setShowEnquiryModal}
      />

    </>
  );
};

export default NavbarMain;
