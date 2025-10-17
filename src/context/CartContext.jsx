import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import {
  addToCartPost,
  getCartAPI,
  removeFromCartAPI,
  updateCartItemAPI,
} from "../api/products.api";

// ----------------- Initial State -----------------
const initialState = { cart: [], loading: true };

// ----------------- Reducer -----------------
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

// ----------------- Context -----------------
const CartContext = createContext();

// ----------------- Helper -----------------
const normalizePayloadToArray = (res) => {
  if (!res?.data) return [];
  if (Array.isArray(res.data.items)) return res.data.items;

  return [];
};

// ----------------- Provider -----------------
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await getCartAPI();
      const payload = normalizePayloadToArray(res);
      dispatch({ type: "SET_CART", payload });
    } catch (err) {
      console.error("Fetch Cart Error:", err);
      dispatch({ type: "SET_CART", payload: [] });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartPost(productId, quantity);
      fetchCart();
    } catch (err) {
      console.error("Add To Cart Error:", err);
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartAPI(productId);
      fetchCart();
    } catch (err) {
      console.error("Remove From Cart Error:", err);
    }
  };

  const updateCartItem = async (productId, deltaQty) => {
    try {
      await updateCartItemAPI(productId, deltaQty); // backend interprets +1 or -1
      fetchCart(); // refresh cart after update
    } catch (err) {
      console.error("Update Cart Item Error:", err);
    }
  };


  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // ----------------- Derived State -----------------
  const cartArr = Array.isArray(state.cart) ? state.cart : [];

  const cartCount = cartArr.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );

  const totalMRP = cartArr.reduce(
    (sum, item) =>
      sum + (Number(item.product?.mrp_price || item.product?.mrp || 0) * Number(item.quantity || 1)),
    0
  );

  const totalPrice = cartArr.reduce(
    (sum, item) =>
      sum + (Number(item.product?.discounted_price || item.product?.price || 0) * Number(item.quantity || 1)),
    0
  );

  const totalSavings = totalMRP - totalPrice;

  // ----------------- Load cart on mount -----------------
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: cartArr,
        addToCart,
        fetchCart,
        clearCart,
        updateCartItem,
        removeFromCart,
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

// ----------------- Hook -----------------
export const useCart = () => useContext(CartContext);
