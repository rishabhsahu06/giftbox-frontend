// import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
// import {
//   addToCartPost,
//   getCartAPI,
//   removeFromCartAPI,
//   updateCartItemAPI,
// } from "../api/products.api";

// // ----------------- Initial State -----------------
// const initialState = { cart: [], loading: true };

// // ----------------- Reducer -----------------
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_CART":
//       return { ...state, cart: action.payload || [], loading: false };
//     case "CLEAR_CART":
//       return { ...state, cart: [], loading: false };
//     case "SET_LOADING":
//       return { ...state, loading: action.payload };
//     default:
//       return state;
//   }
// };

// // ----------------- Context -----------------
// const CartContext = createContext();

// // ----------------- Helper -----------------
// const normalizePayloadToArray = (res) => {
//   if (!res?.data) return [];
//   if (Array.isArray(res.data.items)) return res.data.items;

//   return [];
// };

// // ----------------- Provider -----------------
// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const fetchCart = async () => {
//     dispatch({ type: "SET_LOADING", payload: true });
//     try {
//       const res = await getCartAPI();
//       const payload = normalizePayloadToArray(res);
//       dispatch({ type: "SET_CART", payload });
//     } catch (err) {
//       console.error("Fetch Cart Error:", err);
//       dispatch({ type: "SET_CART", payload: [] });
//     }
//   };

//   const addToCart = async (itemId, quantity = 1) => {
//     try {
//       await addToCartPost(itemId, quantity);
//       fetchCart();
//     } catch (err) {
//       console.error("Add To Cart Error:", err);
//       throw err;
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     try {
//       await removeFromCartAPI(itemId);
//       fetchCart();
//     } catch (err) {
//       console.error("Remove From Cart Error:", err);
//     }
//   };

//   const updateCartItem = async (itemId, deltaQty) => {
//     try {
//       await updateCartItemAPI(itemId, deltaQty); // backend interprets +1 or -1
//       fetchCart(); // refresh cart after update
//     } catch (err) {
//       console.error("Update Cart Item Error:", err);
//     }
//   };


//   const clearCart = () => dispatch({ type: "CLEAR_CART" });

//   // ----------------- Derived State -----------------
//   const cartArr = Array.isArray(state.cart) ? state.cart : [];

//   const cartCount = cartArr.reduce(
//     (sum, item) => sum + (Number(item.quantity) || 1),
//     0
//   );

//   const totalMRP = cartArr.reduce(
//     (sum, item) =>
//       sum + (Number(item.items?.mrp_price || item.product?.mrp || 0) * Number(item.quantity || 1)),
//     0
//   );

//   const totalPrice = cartArr.reduce(
//     (sum, item) =>
//       sum + (Number(item.product?.discounted_price || item.product?.price || 0) * Number(item.quantity || 1)),
//     0
//   );

//   const totalSavings = totalMRP - totalPrice;

//   // ----------------- Load cart on mount -----------------
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart: cartArr,
//         addToCart,
//         fetchCart,
//         clearCart,
//         updateCartItem,
//         removeFromCart,
//         cartCount,
//         totalMRP,
//         totalPrice,
//         totalSavings,
//         loading: state.loading,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ----------------- Hook -----------------
// export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  addToCartPost,
  getCartAPI,
  removeFromCartAPI,
  updateCartItemAPI,
} from "../api/products.api";

// ---------------- Initial State ----------------
const initialState = { cart: [], loading: true };

// ---------------- Reducer ----------------
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload || [], loading: false };
    case "CLEAR_CART":
      return { ...state, cart: [], loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const CartContext = createContext();

const normalizeCart = (res) => {
  if (!res?.data || !Array.isArray(res.data.items)) return [];
  return res.data.items; 
};

// ---------------- Provider ----------------
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch Cart
  const fetchCart = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await getCartAPI();
      dispatch({ type: "SET_CART", payload: normalizeCart(res) });
    } catch (err) {
      console.error("Fetch Cart Error:", err);
      dispatch({ type: "SET_CART", payload: [] });
    }
  };

  // -------------------------------------------------------------
  // 🚨 HYBRID FIX: Handles both Object arguments and Separate arguments
  // -------------------------------------------------------------
  const addToCart = async (arg1, arg2) => {
    let itemId, quantity;

    // CHECK: Are we receiving an object? { itemId: "...", quantity: 1 }
    if (typeof arg1 === "object" && arg1 !== null) {
      itemId = arg1.itemId || arg1.item; // Handle both 'itemId' and 'item' keys just in case
      quantity = arg1.quantity || 1;
    } else {
      // We are receiving separate args: ("...", 1)
      itemId = arg1;
      quantity = arg2 || 1;
    }

    try {
      // Debugging: See exactly what is being processed
      console.log("🛒 Context Processing AddToCart:", { itemId, quantity });

      if (!itemId) {
        console.error("❌ AddToCart Error: itemId is missing. Input was:", arg1);
        return; // Stop here to prevent API call
      }

      // Send normalized object to API
      await addToCartPost({
        itemId, 
        quantity
      });

      await fetchCart();
    } catch (err) {
      console.error("Add To Cart Error:", err);
      throw err;
    }
  };

  // Remove item
  const removeFromCart = async (itemId) => {
    try {
      await removeFromCartAPI(itemId);
      await fetchCart();
    } catch (err) {
      console.error("Remove Cart Error:", err);
    }
  };

  // Update Qty
  const updateCartItem = async (itemId, deltaQty) => {
    try {
      await updateCartItemAPI(itemId, deltaQty);
      await fetchCart();
    } catch (err) {
      console.error("Update Qty Error:", err);
    }
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // ---------------- Derived Values ----------------
  const cartArr = Array.isArray(state.cart) ? state.cart : [];

  const cartCount = cartArr.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );

  const totalMRP = cartArr.reduce(
    (sum, item) =>
      sum + Number(item.item?.mrp_price || 0) * Number(item.quantity),
    0
  );

  const totalPrice = cartArr.reduce(
    (sum, item) =>
      sum +
      Number(item.item?.price || item.item?.discounted_price || 0) *
        Number(item.quantity),
    0
  );

  const totalSavings = totalMRP - totalPrice;

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: cartArr,
        addToCart,
        removeFromCart,
        updateCartItem,
        fetchCart,
        clearCart,
        cartCount,
        totalMRP,
        totalPrice,
        totalSavings,
        loading: state.loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);