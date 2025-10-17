// src/pages/AllProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../Component/UI/ProductCard";
import PageLoader from "../Pageloader/Pageloader";
// import { ByCategory, getAllProductsBySubCategory} from "../api/category.api"

const AllProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  const subcategoryId = searchParams.get("subcategoryId") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res = { products: [] };

        if (categoryId) {
          res = await getAllProductsByCategory(categoryId);
        } else if (subcategoryId) {
          res = await getAllProductsBySubCategory(subcategoryId);
        }

        setProducts(res?.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId]); // ✅ re-fetch when query params change

  const handleProductClick = (id) => navigate(`/product/${id}`);

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
      <div className=" bg-gray-50 px-4 sm:px-6 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            All Products
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-black text-white font-medium shadow-md hover:bg-gray-700 transition"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
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
              No products available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProductsPage;
