import React, { useState, useEffect } from "react";
import { ShoppingCart, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { getAllproducts } from "../../api/products.api";

const categories = [
  "Rakhi",
  "Birthday",
  "Anniversary",
  "Husband",
  "Wife",
  "Children",
  "GirlFriend"
];

export default function BestSellingCategories({ onViewAll }) {
  const [activeCategory, setActiveCategory] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch products based on active category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ✅ Send proper request body matching backend controller
        const requestBody = {
          tags: activeCategory, // ✅ Send as tags (Rakhi, Birthday, etc.)
          sortBy: "sales",
          sortOrder: "desc",
          inStock: 'true'
        };

        console.log("Fetching products with:", requestBody);

        const res = await getAllproducts(requestBody);
        const fetchedProducts = res?.data?.products || [];

        setProducts(fetchedProducts);
        console.log(`Fetched ${fetchedProducts.length} products for ${activeCategory}`);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // Handle add to cart
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
  const handleViewAll = () => onViewAll && onViewAll();

  const calculateDiscount = (original, sale) => {
    if (!original || !sale) return 0;
    return Math.round(((original - sale) / original) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-gray-200"></div>
      </div>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Best Selling Categories
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Discover the perfect gift for every occasion
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${activeCategory === category
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-md"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400"
                }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {products.length > 0 ? (
            products.map((product) => (
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
                  {/* Discount Badge */}
                  {calculateDiscount(product.mrp_price, product.discounted_price) > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                      {calculateDiscount(product.mrp_price, product.discounted_price)}% OFF
                    </div>
                  )}
                  {/* Out of Stock Overlay */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">OUT OF STOCK</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {product.name}
                  </h3>

                  {/* Price Section */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="flex items-center">
                      <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        {product.discounted_price}
                      </span>
                    </div>
                    {product.mrp_price > product.discounted_price && (
                      <div className="flex items-center">
                        <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 line-through" />
                        <span className="text-sm sm:text-base text-gray-400 line-through">
                          {product.mrp_price}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock Info */}
                  <div className="mb-3">
                    <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-red-500 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleAddCart(product)}
                      disabled={adding === product._id || product.stock === 0}
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">
                        {adding === product._id ? "ADDING..." : "ADD CART"}
                      </span>
                      <span className="xs:hidden">
                        {adding === product._id ? "..." : "CART"}
                      </span>
                    </button>
                    <button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => handleBuyNow(product)}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting a different category.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={handleViewAll}
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}