// import { Axios } from "../constants/maincontant";

// export const addToWishlist = async (productId) => {
//   try {
//     const response = await Axios.post("/user/add-to-wishlist", { productId });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding to wishlist:", error);
//     throw error;
//   }
// };

// export const getWishlist = async () => {
//   try {
//     const res = await Axios.get("/user/get-wishlist");
//     return res.data;
//   } catch (error) {
//     console.error("Error in getWishlistAPI:", error);
//     return error;
//   }
// };

// export const removeFromWishlist = async (productId) => {
//   try {
//     const res = await Axios.delete("/user/remove-from-wishlist", {
//       data: { productId },
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error removing from wishlist:", error);
//     return  error;
//   }
// };
