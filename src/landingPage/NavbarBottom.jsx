import React, { useEffect, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, User, ShoppingCart, ChevronDown } from "lucide-react";
import { getParentCategoriesBySubcategory } from "../api/category.api";
import { toast } from "sonner";

const secondaryNavItems = [
    { label: "AboutUs", href: "/aboutus" },
    { label: "24x7 Customer Care Support", href: "/support" },
];

const staticCategoryLinks = [
    { label: "All Categories", href: "/allcategory" },
    { label: "Customized", href: "/customize" },
];

const NavbarBottom = ({ mobileOpen, setMobileOpen, isActiveNavItem, setShowEnquiryModal }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch categories with proper error handling
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await getParentCategoriesBySubcategory();
                if (res?.data) {
                    // ✅ Sort categories alphabetically for better UX
                    const sortedCategories = res.data.sort((a, b) => 
                        a.name.localeCompare(b.name)
                    );
                    setCategories(sortedCategories);
                    console.log(`Loaded ${sortedCategories.length} categories`);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                toast.error("Failed to load categories");
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Handle protected navigation (login required)
    const handleProtectedNav = (path) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            toast.info("Please login to continue 🧑‍💻");
            setTimeout(() => navigate("/login"), 600);
            return;
        }
        navigate(path);
    };

    // Navigate to category with filter
    const handleCategoryClick = (categoryId, categoryName) => {
        // Navigate to all category page with category filter applied
        navigate('/allcategory', { 
            state: { 
                selectedCategory: categoryName,
                categoryId: categoryId 
            } 
        });
    };

    // Navigate to subcategory with filter
    const handleSubcategoryClick = (subcategoryId, subcategoryName, e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/allcategory', { 
            state: { 
                selectedCategory: subcategoryName,
                categoryId: subcategoryId 
            } 
        });
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-[64px] sm:top-[80px] z-40">
            {/* ---------- DESKTOP NAV ---------- */}
            <div className="max-w-7xl mx-auto px-2 hidden lg:flex items-center justify-between py-3">
                {/* CATEGORY SECTION */}
                <div className="flex items-center space-x-2">
                    {/* Static Links */}
                    {staticCategoryLinks.map((item) => {
                        const isCustomized = item.label === "Customized";
                        const isAllCategories = item.label === "All Categories";

                        // 🟢 Handle "All Categories" dropdown
                        if (isAllCategories) {
                            return (
                                <div key={item.label} className="relative group">
                                    <Link
                                        to={item.href}
                                        className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                                            isActiveNavItem(item.href)
                                                ? "bg-black text-white"
                                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                        }`}
                                    >
                                        {item.label}
                                        <ChevronDown className="w-3 h-3" />
                                    </Link>

                                    {/* Dropdown menu */}
                                    {!loading && categories.length > 0 && (
                                        <div className="absolute left-0 top-full mt-1 w-[700px] grid grid-cols-3 gap-2 bg-white border border-gray-200 shadow-xl rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 ease-in-out z-50 p-3 max-h-[400px] overflow-y-auto">
                                            {categories.map((cat) => (
                                                <div 
                                                    key={cat._id} 
                                                    className="border rounded-md hover:bg-gray-50 transition"
                                                >
                                                    <button
                                                        onClick={() => handleCategoryClick(cat._id, cat.name)}
                                                        className="w-full flex items-center gap-2 p-2 text-gray-800 hover:text-black text-left"
                                                    >
                                                        {cat.image && (
                                                            <img
                                                                src={cat.image}
                                                                alt={cat.name}
                                                                className="w-8 h-8 object-cover rounded"
                                                                loading="lazy"
                                                            />
                                                        )}
                                                        <span className="font-medium text-sm">{cat.name}</span>
                                                    </button>

                                                    {/* Subcategories */}
                                                    {cat.subCategories?.length > 0 && (
                                                        <div className="pl-10 py-1">
                                                            {cat.subCategories.map((sub) => (
                                                                <button
                                                                    key={sub._id}
                                                                    onClick={(e) => handleSubcategoryClick(sub._id, sub.name, e)}
                                                                    className="w-full text-left block text-sm text-gray-600 py-1 hover:underline hover:text-black"
                                                                >
                                                                    {sub.name}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // 🟡 Handle "Customized"
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                                    isActiveNavItem(item.href)
                                        ? "bg-black text-white"
                                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                } ${
                                    isCustomized
                                        ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white shadow-lg animate-pulse"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    {/* Dynamic Parent Categories (First 6 only for navbar) */}
                    {!loading && categories.slice(0, 6).map((cat) => (
                        <div key={cat._id} className="relative group">
                            <button
                                onClick={() => handleCategoryClick(cat._id, cat.name)}
                                className={`px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                                    isActiveNavItem(`/allcategory/${cat._id}`)
                                        ? "bg-black text-white"
                                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                            >
                                {cat.name}
                                {cat.subCategories?.length > 0 && (
                                    <ChevronDown className="w-3 h-3" />
                                )}
                            </button>

                            {/* Dropdown for subcategories */}
                            {cat.subCategories?.length > 0 && (
                                <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                                    {cat.subCategories.map((sub) => (
                                        <button
                                            key={sub._id}
                                            onClick={(e) => handleSubcategoryClick(sub._id, sub.name, e)}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                                        >
                                            {sub.image && (
                                                <img
                                                    src={sub.image}
                                                    alt={sub.name}
                                                    className="w-8 h-8 object-cover rounded"
                                                    loading="lazy"
                                                />
                                            )}
                                            <span>{sub.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Show "More" if categories > 6 */}
                    {categories.length > 6 && (
                        <div className="relative group">
                            <button
                                className="px-3 py-2 rounded text-sm font-medium transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-100 flex items-center gap-1"
                            >
                                More
                                <ChevronDown className="w-3 h-3" />
                            </button>

                            {/* More categories dropdown */}
                            <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 max-h-[400px] overflow-y-auto">
                                {categories.slice(6).map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => handleCategoryClick(cat._id, cat.name)}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                                    >
                                        {cat.image && (
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="w-8 h-8 object-cover rounded"
                                                loading="lazy"
                                            />
                                        )}
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* SECONDARY LINKS */}
                <div className="flex items-center space-x-1">
                    {secondaryNavItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                                isActiveNavItem(item.href)
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* --------------------------- MOBILE DRAWER ----------------------------------------- */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[999] lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl border-l-4 border-[#cd5d63] rounded-l-2xl transform transition-transform duration-500 ease-in-out translate-x-0 overflow-y-auto">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                                <button 
                                    onClick={() => setMobileOpen(false)} 
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Profile / Cart */}
                            <div className="mb-6">
                                <button
                                    onClick={() => {
                                        const token = localStorage.getItem("accessToken");
                                        setMobileOpen(false);
                                        navigate(token ? "/dashboard" : "/login");
                                    }}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 mb-2"
                                >
                                    <User className="w-5 h-5 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">
                                        {localStorage.getItem("accessToken") ? "Profile" : "Login"}
                                    </span>
                                </button>

                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        handleProtectedNav("/cart");
                                    }}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 mb-2"
                                >
                                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                                    <span className="text-sm font-medium text-gray-900">Cart</span>
                                </button>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 px-3">
                                    Categories
                                </h3>

                                {/* All Categories Link */}
                                <Link
                                    to="/allcategory"
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full flex items-center p-3 rounded-lg mb-2 text-gray-800 hover:bg-gray-50 font-semibold bg-gray-100"
                                >
                                    All Categories
                                </Link>

                                {/* Dynamic Categories */}
                                {loading ? (
                                    <div className="text-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-red-500 mx-auto"></div>
                                    </div>
                                ) : (
                                    categories.map((cat) => (
                                        <div key={cat._id} className="mb-2">
                                            <button
                                                onClick={() => {
                                                    handleCategoryClick(cat._id, cat.name);
                                                    setMobileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-2 p-3 rounded-lg text-gray-800 hover:bg-gray-50 font-medium text-left"
                                            >
                                                {cat.image && (
                                                    <img
                                                        src={cat.image}
                                                        alt={cat.name}
                                                        className="w-6 h-6 object-cover rounded"
                                                        loading="lazy"
                                                    />
                                                )}
                                                {cat.name}
                                            </button>
                                            
                                            {/* Subcategories */}
                                            {cat.subCategories?.map((sub) => (
                                                <button
                                                    key={sub._id}
                                                    onClick={() => {
                                                        handleSubcategoryClick(sub._id, sub.name, { 
                                                            preventDefault: () => {}, 
                                                            stopPropagation: () => {} 
                                                        });
                                                        setMobileOpen(false);
                                                    }}
                                                    className="w-full flex items-center pl-8 p-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm text-left"
                                                >
                                                    {sub.name}
                                                </button>
                                            ))}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Support Links */}
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 px-3">
                                    Support
                                </h3>
                                {secondaryNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full flex items-center p-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-50"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Bulk Orders */}
                            <button
                                onClick={() => {
                                    setShowEnquiryModal(true);
                                    setMobileOpen(false);
                                }}
                                className="flex items-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg w-full justify-center mt-6"
                            >
                                Bulk Orders / Enquiry
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default memo(NavbarBottom);