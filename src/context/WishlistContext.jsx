// import React, { createContext, useState, useContext, useEffect } from "react";
// import { getWishlist, addToWishlist, removeFromWishlist } from "../api/wishlist.api";
// import { toast } from "sonner";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const data = await getWishlist();
    
//       const formattedWishlist = data?.products?.map((item) => {
//         if (item._id) return item;
//         if (item.productId?._id) return item.productId;
//         if (typeof item.productId === "string") return { _id: item.productId }; 
//         return item;
//       }) || [];
//       setWishlist(formattedWishlist);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//       toast.error("Failed to fetch wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const handleAddToWishlist = async (product) => {
//     try {
//       await addToWishlist(product._id);
//       await fetchWishlist(); 
//       toast.success("Added to wishlist!");
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       toast.error("Please login first to add items in wishlist");
//     }
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       await removeFromWishlist(productId);
//       await fetchWishlist();
//       toast.success("Removed from wishlist!");
//     } catch (error) {
//       console.error("Error removing from wishlist:", error);
//       toast.error("Failed to remove from wishlist");
//     }
//   };

//   const toggleWishlist = async (product) => {
//     const exists = wishlist.some((p) => p._id === product._id);
//     if (exists) {
//       await handleRemoveFromWishlist(product._id);
//     } else {
//       await handleAddToWishlist(product);
//     }
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading, fetchWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);
