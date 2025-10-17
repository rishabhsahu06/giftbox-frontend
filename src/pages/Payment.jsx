import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createOrderAPI, verifyPaymentAPI } from "../api/address.api";
import PageLoader from "../Pageloader/Pageloader";
import { motion, AnimatePresence } from "framer-motion";
const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addressId, totalAmount, totalMRP, totalSavings } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/dashboard/myOrders");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate]);

  const handleCOD = async () => {
    try {
      setLoading(true);
      const res = await createOrderAPI({ addressId, paymentMethod: "COD" });
      if (res?.success) {
        setShowSuccessModal(true);
      } else {
        toast.error(res?.message || "COD order failed");
      }
    } catch (err) {
      toast.error("COD order failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      setLoading(true);

      const orderRes = await createOrderAPI({
        addressId,
        amount: totalAmount,
        paymentMethod: "payOnline",
      });
      const order = orderRes?.data?.razorpayOrder;

      if (!order) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: "rzp_test_RT2QxXAweehcUn", 
        amount: order.amount.toString(),
        currency: order.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await verifyPaymentAPI({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              addressId,
              amount: order.amount,
            });

            if (verifyRes.success) {
              setShowSuccessModal(true);
            } else {
              toast.error(verifyRes.message || "Payment verification failed");
            }
          } catch (err) {
            toast.error("Something went wrong during payment verification");
          }
        },
        prefill: { name: "User", email: "user@example.com" },
        theme: { color: "#007bff" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        toast.error("Payment failed: " + response.error.description);
      });
      rzp1.open();


      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!addressId || !paymentMethod) {
      toast.error("Missing details. Please try again.");
      return;
    }

    if (paymentMethod === "cod") {
      handleCOD();
    } else {
      handleOnlinePayment();
    }
  };

  // if (loading) return <PageLoader />;

  return (
    <>
      {loading && <PageLoader loading={loading} />}

      <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left - Payment Method */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">Select Payment Method</h2>

          <div className="space-y-4">
            {/* COD */}
            <label
              className={`flex items-center justify-between gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "cod"
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-black"
                />
                <span className="text-gray-800 font-medium">Cash on Delivery (COD)</span>
              </div>
              <span className="text-gray-500 text-sm">Pay with cash</span>
            </label>

            {/* Online Payment */}
            <label
              className={`flex items-center justify-between gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "payOnline"
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="payOnline"
                  checked={paymentMethod === "payOnline"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-black"
                />
                <span className="text-gray-800 font-medium">Pay Online (Razorpay)</span>
              </div>
              <span className="text-gray-500 text-sm">Cards, UPI, Net Banking</span>
            </label>
          </div>
        </div>

        {/* Right - Price Details */}
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">PRICE DETAILS</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700"><span>Total MRP</span><span>₹{totalMRP?.toFixed(2) || 0}</span></div>
            <div className="flex justify-between text-green-600"><span>Offer Discount</span><span>- ₹{totalSavings?.toFixed(2) || 0}</span></div>
            <div className="flex justify-between text-gray-700"><span>Delivery Fee</span><span>Free</span></div>
            <hr />
            <div className="flex justify-between font-semibold text-lg"><span>Total Payable Amount</span><span>₹{totalAmount?.toFixed(2) || 0}</span></div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer ${paymentMethod ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            CONTINUE
          </button>
        </div>
      </div>



      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full"
            >
              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100"
              >
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                🎉 Order Purchased Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed. Redirecting to My Orders...
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/dashboard/myOrders");
                }}
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 w-full"
              >
                Go to Orders
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>

  );
};

export default Payment;
