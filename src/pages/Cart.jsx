import React, { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import PageLoader from "../Pageloader/Pageloader";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    fetchCart,
    totalMRP,
    totalPrice,
    totalSavings,
  } = useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchCart();
      setLoading(false);
    };
    loadCart();
  }, []);

  if (loading) return <PageLoader />;

  if (!cart || cart.length === 0) {
    return (
      <div className="p-20 mt-7 text-center space-y-4">
        <p className="text-xl">Your cart is empty.</p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Go to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">{cart.length} Items</h2>

          <div className="space-y-6">
            <AnimatePresence>
              {cart.map((item) => {
                const product = item.product ?? {};
                const qty = item.quantity ?? 1;
                const price = product.discounted_price ?? 0;
                const mrp = product.mrp_price ?? 0;

                // image fallback
                const imgSrc =
                  product.images?.[0]?.image ||
                  product.images?.[0] ||
                  "https://via.placeholder.com/150";

                return (
                  <motion.div
                    key={product._id || item._id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200, height: 0, margin: 0, padding: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={imgSrc}
                      alt={product.name || "Product"}
                      className="w-24 h-28 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">{product.name || "Unnamed Product"}</h3>
                      <p className="text-sm text-gray-500">{product.brand || "No Brand"}</p>

                      <div className="flex items-center mt-2 gap-3">
                        <button
                          onClick={() => updateCartItem(product._id, -1)} // always -1
                          className="p-1 border rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>

                        <span>{qty}</span>

                        <button
                          onClick={() => updateCartItem(product._id, 1)} // always +1
                          className="p-1 border rounded-full cursor-pointer hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="mt-2">
                        <span className="text-lg font-semibold">₹{price * qty}</span>{" "}
                        <span className="line-through text-gray-400 ml-2">₹{mrp * qty}</span>{" "}
                        <span className="text-orange-600 font-medium">
                          {mrp ? Math.round(((mrp - price) / mrp) * 100) : 0}% OFF
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <MdDelete size={20} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section - Price Details */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
            <h3 className="font-semibold mb-4">Price Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex justify-between">
                <span>Offer Discount</span>
                <span>-₹{totalSavings}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Your Total Savings</span>
                <span>₹{totalSavings}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Payable Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <Link to="/cart/address">
              <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800">
                Place Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
