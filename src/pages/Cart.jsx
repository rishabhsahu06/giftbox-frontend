import React, { useEffect, useState, useMemo } from "react";
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
  const [localCart, setLocalCart] = useState([]);

  /* Initial load */
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchCart();
      setLoading(false);
    };
    loadCart();
  }, []);

  /* Sync local cart */
  useEffect(() => {
    if (Array.isArray(cart)) {
      setLocalCart(cart);
    }
  }, [cart]);

  /* Quantity change (instant UI) */
  const changeQty = (productId, delta) => {
    setLocalCart((prev) =>
      prev.map((ci) =>
        ci.item?._id === productId
          ? {
              ...ci,
              quantity: Math.max(1, (ci.quantity || 1) + delta),
            }
          : ci
      )
    );

    // backend sync
    updateCartItem(productId, delta);
  };

  /* Delete item (instant) */
  const deleteItem = (productId) => {
    setLocalCart((prev) =>
      prev.filter((ci) => ci.item?._id !== productId)
    );

    removeFromCart(productId);
  };

  const safeCart = useMemo(
    () =>
      localCart.filter((ci) => ci?.item?._id),
    [localCart]
  );

  if (loading) return <PageLoader />;

  if (!safeCart.length) {
    return (
      <div className="p-20 text-center space-y-4">
        <p className="text-xl">Your cart is empty.</p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Go to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {safeCart.length} Items
          </h2>

          <div className="space-y-6">
            <AnimatePresence>
              {safeCart.map((ci) => {
                const item = ci.item;
                const qty = ci.quantity || 1;
                const productId = item._id;

                const img =
                  item.image ||
                  item.images?.[0] ||
                  "https://via.placeholder.com/150";

                const price =
                  item.price || item.discounted_price || 0;
                const mrp = item.mrp_price || item.mrp || price;

                return (
                  <motion.div
                    key={ci._id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    {/* IMAGE */}
                    <img
                      src={img}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded-lg"
                      loading="lazy"
                    />

                    {/* INFO */}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>

                      {/* Quantity */}
                      <div className="flex items-center mt-2 gap-3">
                        <button
                          onClick={() =>
                            changeQty(productId, -1)
                          }
                          disabled={qty <= 1}
                          className="p-1 border rounded-full"
                        >
                          <Minus size={16} />
                        </button>

                        <span>{qty}</span>

                        <button
                          onClick={() =>
                            changeQty(productId, 1)
                          }
                          className="p-1 border rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* PRICE */}
                      <div className="mt-2">
                        <span className="text-lg font-semibold">
                          ₹{price * qty}
                        </span>
                        <span className="line-through text-gray-400 ml-2">
                          ₹{mrp * qty}
                        </span>
                      </div>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteItem(productId)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <MdDelete size={20} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT SIDE */}
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
            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;