import React, { useState, useEffect } from "react";
import { ShoppingCart, IndianRupee, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import { getAllproducts } from "../../api/products.api";
import { getAllCategories } from "../../api/category.api";

const AllCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceFilter, setPriceFilter] = useState("Price");
  const [sortBy, setSortBy] = useState("Best Seller");
  const [stockFilter, setStockFilter] = useState("In Stock");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [adding, setAdding] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const priceRanges = ["Price", "Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"];
  const sortOptions = ["Best Seller", "Price: Low to High", "Price: High to Low", "Newest First"];
  const stockOptions = ["In Stock", "Out of Stock", "All"];

  // Flatten categories recursively to handle subcategories
  const flattenCategories = (categories) => {
    let result = [];
    categories.forEach((cat) => {
      result.push({ _id: cat._id, name: cat.name });
      if (cat.subCategories && cat.subCategories.length > 0) {
        result = result.concat(flattenCategories(cat.subCategories));
      }
    });
    return result;
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      const allCategories = res?.data || [];
      const flatCategories = flattenCategories(allCategories);
      setCategories([{ _id: "all", name: "All Categories" }, ...flatCategories]);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      toast.error("Failed to load categories");
    }
  };

  // ✅ Handle navigation state (when clicking from navbar)
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Fetch products based on filters - FIXED TO MATCH BACKEND
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Backend expects req.body, so we build the request body
      const requestBody = {
        page: 1,
        limit: 100, // Load more products for client-side pagination
      };

      // Category filter - send exact category name
      if (selectedCategory !== "All Categories") {
        requestBody.category = selectedCategory;
      }

      // Price filter - send minPrice and maxPrice
      switch (priceFilter) {
        case "Under ₹500":
          requestBody.maxPrice = 500;
          break;
        case "₹500 - ₹1000":
          requestBody.minPrice = 500;
          requestBody.maxPrice = 1000;
          break;
        case "₹1000 - ₹2000":
          requestBody.minPrice = 1000;
          requestBody.maxPrice = 2000;
          break;
        case "Above ₹2000":
          requestBody.minPrice = 2000;
          break;
      }

      // Sort filter - send sortBy and sortOrder
      switch (sortBy) {
        case "Price: Low to High":
          requestBody.sortBy = "price";
          requestBody.sortOrder = "asc";
          break;
        case "Price: High to Low":
          requestBody.sortBy = "price";
          requestBody.sortOrder = "desc";
          break;
        case "Newest First":
          requestBody.sortBy = "createdAt";
          requestBody.sortOrder = "desc";
          break;
        default:
          // Best Seller
          requestBody.sortBy = "sales";
          requestBody.sortOrder = "desc";
      }

      // Stock filter - backend expects string 'true' for inStock check
      if (stockFilter === "In Stock") {
        requestBody.inStock = 'true'; // String 'true', not boolean
      } else if (stockFilter === "Out of Stock") {
        requestBody.inStock = 'false'; // For out of stock
      }
      // For "All", don't send inStock parameter

      console.log("Request Body being sent:", requestBody);

      // Make API call with requestBody
      const res = await getAllproducts(requestBody);
      const fetchedProducts = res?.data?.products || [];
      
      setProducts(fetchedProducts);
      setTotalPages(res?.data?.totalPages || 1);
      setCurrentPage(res?.data?.currentPage || 1);
      
      console.log(`Fetched ${fetchedProducts.length} products for category: ${selectedCategory}`);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on mount
  }, []);

  useEffect(() => {
    fetchProducts(); // Fetch products when filters change
    setVisibleProducts(8); // Reset visible products count
  }, [selectedCategory, priceFilter, sortBy, stockFilter]);

  const handleAddCart = async (product) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.info("Please login to continue 🧑‍💻");
      setTimeout(() => navigate("/login"), 500);
      return;
    }

    setAdding(product._id);
    try {
      await addToCart(product._id, 1);
      toast.success(`${product.name} added to cart!`);
      if (navigator.vibrate) navigator.vibrate(100);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to add ${product.name}`);
    } finally {
      setAdding(null);
    }
  };

  const handleBuyNow = (product) => navigate(`/product/${product._id}`);
  
  const calculateDiscount = (original, sale) => {
    if (!original || !sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };
  
  const handleLoadMore = () => setVisibleProducts((prev) => prev + 8);

  const displayedProducts = products.slice(0, visibleProducts);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative w-full h-48 sm:h-64 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200')` 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              {selectedCategory === "All Categories" ? "All Categories" : selectedCategory}
            </h1>
            <p className="text-base sm:text-lg text-gray-200">
              Discover the perfect gift for every occasion
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className=" mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Price Filter */}
          <div className="relative">
            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)} 
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
            >
              {priceRanges.map((price) => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
            >
              {sortOptions.map((sort) => (
                <option key={sort} value={sort}>{sort}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Stock Filter */}
          <div className="relative">
            <select 
              value={stockFilter} 
              onChange={(e) => setStockFilter(e.target.value)} 
              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent cursor-pointer"
            >
              {stockOptions.map((stock) => (
                <option key={stock} value={stock}>{stock}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{displayedProducts.length}</span> of{" "}
            <span className="font-semibold">{products.length}</span> products
            {selectedCategory !== "All Categories" && (
              <span className="text-red-500 font-semibold"> in {selectedCategory}</span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" 
                    onClick={() => handleBuyNow(product)} 
                    loading="lazy" 
                  />
                  {calculateDiscount(product.mrp_price, product.discounted_price) > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                      {calculateDiscount(product.mrp_price, product.discounted_price)}% OFF
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">OUT OF STOCK</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>

                  {/* Price Section */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {product.discounted_price}
                      </span>
                    </div>
                    {product.mrp_price > product.discounted_price && (
                      <div className="flex items-center">
                        <IndianRupee className="w-3 h-3 text-gray-400 line-through" />
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          {product.mrp_price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock Information */}
                  <div className="mb-3">
                    <span className={`text-xs font-medium ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <button 
                      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-red-500 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => handleAddCart(product)} 
                      disabled={adding === product._id || product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{adding === product._id ? "ADDING..." : "ADD CART"}</span>
                    </button>
                    <button 
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg" 
                      onClick={() => handleBuyNow(product)}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">No products found for these filters.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visibleProducts < products.length && (
          <div className="text-center">
            <button 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg" 
              onClick={handleLoadMore}
            >
              LOAD MORE ({products.length - visibleProducts} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategoryPage;