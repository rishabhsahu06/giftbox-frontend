import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../Component/UI/ProductCard";
import { getAllproducts } from "../api/products.api";
import PageLoader from "../Pageloader/Pageloader";

const FashionProductCards = () => {
  const [loading, setloading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const navigate = useNavigate();
   const location = useLocation();

  const fetchProducts = async () => {
    setloading(true);
    try {
      const res = await getAllproducts();
      if (res && res.products) {
        setProducts(res.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate("/cart");
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleWishlistToggle = (id) => {
    setWishlist((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <>
      {loading && <PageLoader loading={loading} />}
      <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-8">
        <div className="mx-auto mb-6 w-full flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-[1.5rem] font-bold mb-[0.2rem]">
              Fashion Collection
            </h1>
            <p className="text-gray-600 mt-1">
              Discover our latest premium clothing collection
            </p>
          </div>
         {location.pathname !== "/products" && (
        <button
          onClick={() => navigate("/products")}
          className="md:px-5 md:py-2 rounded-lg bg-gradient-to-r px-3 text-sm from-yellow-500 via-orange-400 to-red-400 text-white font-semibold shadow-md hover:scale-105 transform transition duration-300 cursor-pointer"
        >
          View All
        </button>
      )}
        </div>

        <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {products.length > 0 ? (
            products.slice(0,15).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onProductClick={handleProductClick}
                onWishlistToggle={handleWishlistToggle}
                isWishlisted={wishlist.has(product._id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No products found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FashionProductCards;
