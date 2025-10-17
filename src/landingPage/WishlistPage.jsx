import React from "react";
// import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../Component/UI/ProductCard";

const WishlistPage = ({ onProductClick }) => {
  const { wishlist, loading } = useWishlist();

  if (loading) return <p className="p-6 text-center">Loading wishlist...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} onProductClick={onProductClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
