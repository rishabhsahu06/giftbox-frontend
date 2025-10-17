import React, { useState } from "react";
import { Star, Heart } from "lucide-react";
// import { useWishlist } from "../../context/WishlistContext";
import { toast } from "sonner";
import PageLoader from "../../Pageloader/Pageloader"; // 👈 apna loader import karo

const ProductCard = ({ product, onProductClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  // const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some((p) => p._id === product._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login first to add items in wishlist", {
        autoClose: 2000,
      });
      navigate("/login");
      return;
    }

    toggleWishlist(product);
  };

  return (
    <div
      className="bg-white rounded-md shadow hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onProductClick(product._id)}
    >
      <div className="relative w-full h-56 md:h-75 flex items-center justify-center overflow-hidden">
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-sm ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
          />
        </button>

        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <PageLoader /> {/* 👈 yahan loader show hoga */}
          </div>
        )}

        <img
          src={product.images?.[0]?.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1 group-hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">{product.brand}</p>

        <div className="flex items-center gap-1">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
