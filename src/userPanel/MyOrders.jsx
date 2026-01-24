import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api/products.api";
import { useNavigate } from "react-router-dom";
import PageLoader from "../Pageloader/Pageloader";

/* ================= Status Styles ================= */
const statusColors = {
  PENDING:
    "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900",
  PROCESSING:
    "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900",
  SHIPPED:
    "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900",
  DELIVERED:
    "bg-gradient-to-r from-green-200 to-green-300 text-green-900",
  CANCELLED:
    "bg-gradient-to-r from-red-200 to-red-300 text-red-900",
};

/* ================= Reusable Item ================= */
const OrderItems = ({ items }) => {
  if (!items?.length) return null;

  return items.map((item) => {
    const product = item?.product || item?.item || {};

    return (
      <div
        key={item?._id}
        className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg mb-2"
      >
        <img
          src={product?.images?.[0] || "/no-image.png"}
          alt={product?.name || "Product"}
          className="w-12 h-12 object-cover rounded-lg border"
        />

        <div>
          <p className="font-medium text-sm">
            {product?.name || "Product"}
          </p>
          <p className="text-xs text-gray-500">
            {item?.quantity || 0} × ₹
            {product?.discounted_price || 0}
          </p>
        </div>
      </div>
    );
  });
};

/* ================= Main Component ================= */
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        setOrders(res?.data || []);
      } catch (err) {
        console.error("Order fetch failed", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleInvoice = (orderId) => {
    navigate("/dashboard/invoice", { state: { orderId } });
  };

  if (loading) return <PageLoader />;

  if (!orders.length) {
    return (
      <div className="w-full flex justify-center py-16">
        <p className="text-gray-500 text-lg">
          🚫 No orders found. Start shopping now!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800">
        📦 My Orders
      </h2>

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block rounded-xl border bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["Order ID", "Date", "Status", "Items", "Total", ""].map(
                  (head) => (
                    <th
                      key={head}
                      className="px-5 py-4 text-left font-semibold text-gray-700"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order?._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 font-mono break-all">
                    #{order?._id}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        statusColors[order?.status] || ""
                      }`}
                    >
                      {order?.status || "NA"}
                    </span>
                  </td>

                  <td className="px-5 py-4 max-w-md">
                    <OrderItems items={order?.items} />
                  </td>

                  <td className="px-5 py-4 font-bold">
                    ₹{order?.totalAmount || 0}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleInvoice(order?._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="grid md:hidden gap-4">
        {orders.map((order) => (
          <div
            key={order?._id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-mono">#{order?._id}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  statusColors[order?.status] || ""
                }`}
              >
                {order?.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              {order?.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "-"}
            </p>

            <OrderItems items={order?.items} />

            <p className="font-bold mt-3">
              Total: ₹{order?.totalAmount || 0}
            </p>

            <button
              onClick={() => handleInvoice(order?._id)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
            >
              View Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
