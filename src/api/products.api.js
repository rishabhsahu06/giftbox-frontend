import { Axios } from "../constants/maincontant";

// ✅ FIXED: Now accepts filters parameter and sends in req.body
export const getAllproducts = async (filters = {}) => {
  try {
    const response = await Axios.post("/api/v1/products/get-products", filters);
    
    console.log('✅ Products received:', response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
    return error;
  }
};

export const getProductById = async (itemId) => {
  try {
    const response = await Axios.get(`/api/v1/products/get-product/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
};

export const addToCartPost = async (data) => {
  try {
    const response = await Axios.post("/api/v1/cart/add-cart", data);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error; // Throw error so the frontend can catch it (e.g. show toast)
  }
};

export const getCartAPI = async () => {
  try {
    const res = await Axios.get("/api/v1/cart/get-cart");
    return res.data;
  } catch (error) {
    console.error("Error in getCartAPI:", error);
    throw error;
  }
};

// Remove from cart
export const removeFromCartAPI = async (itemId) => {
  const res = await Axios.delete(`/api/v1/cart/remove/${itemId}`);
  return res.data;
};

// Update cart item qty
export const updateCartItemAPI = async (itemId, quantity) => {
  const res = await Axios.patch(`/api/v1/cart/update-quantity/${itemId}`, {
    quantity, 
  });
  return res.data;
};

// --------------- ADDRESS APIs ------------------

export const getUserAddressesAPI = async () => {
  try {
    const res = await Axios.get("/api/v1/address/get-address");
    return res.data;
  } catch (err) {
    console.error("Get Addresses Error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const addAddressAPI = async (address) => {
  try {
    const res = await Axios.post("/api/v1/address/create-address", address);
    return res.data;
  } catch (err) {
    console.error("Add Address Error:", err.response?.data || err.message);
    return err.response?.data || err;
  }
};

export const updateAddressAPI = async (address, addressId) => {
  try {
    const res = await Axios.patch(`/api/v1/address/update-address/${addressId}`, address);
    return res.data;
  } catch (err) {
    console.error("Update Address Error:", err.response?.data || err.message);
    return err.response?.data || err;
  }
};

export const deleteAddressAPI = async (addressId) => {
  try {
    const res = await Axios.delete(`/api/v1/address/delete-address/${addressId}`);
    return res.data;
  } catch (err) {
    console.error("Delete Address Error:", err.response?.data || err.message);
    return err.response?.data || err;
  }
};

export const setDefaultAddressAPI = async (addressId) => {
  try {
    const res = await Axios.post("/user/set-default-address", { addressId });
    return res.data;
  } catch (err) {
    console.error("Set Default Address Error:", err.response?.data || err.message);
    return err.response?.data || err;
  }
};

export const getUserOrders = async () => {
  try {
    const res = await Axios.get("/api/v1/orders/my-orders");
    return res.data;
  } catch (err) {
    console.error("Get Orders Error:", err.response?.data || err.message);
    return err.response?.data || err;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const res = await Axios.get(`/api/v1/orders/order-by-id/${orderId}`);
    return res.data;
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};