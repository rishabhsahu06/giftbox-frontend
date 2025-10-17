import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api/products.api";
import { useNavigate } from "react-router-dom";
import PageLoader from "../Pageloader/Pageloader";

const statusColors = {
  PENDING: "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900 shadow-sm",
  PROCESSING: "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 shadow-sm",
  SHIPPED: "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 shadow-sm",
  DELIVERED: "bg-gradient-to-r from-green-200 to-green-300 text-green-900 shadow-sm",
  CANCELLED: "bg-gradient-to-r from-red-200 to-red-300 text-red-900 shadow-sm",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getUserOrders();
        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
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

  if (!orders || orders.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        🚫 No orders found. Start shopping now!
      </p>
    );

  return (
    <div className="mx-auto p-0 sm:p-6 w-full">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">
        📦 My Orders
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block w-full rounded-xl shadow-xl border border-gray-200 bg-white/70 backdrop-blur">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="table-auto min-w-full bg-white rounded-xl">
            <thead className="sticky top-0 bg-gradient-to-r from-gray-100 to-gray-200 z-10">
              <tr>
                {["Order ID", "Date", "Status", "Items", "Total", "Invoice"].map((head) => (
                  <th key={head} className="py-4 px-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="py-3 px-5 text-sm text-gray-700 font-mono break-all">
                    #{order._id}
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-700">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center gap-3 mb-2 bg-gray-50 rounded-lg p-2">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{item.product.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × ₹{item.product.discounted_price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-5 text-sm font-bold text-gray-800">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3 px-5 text-sm">
                    <button
                      onClick={() => handleInvoice(order._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-lg hover:scale-105 hover:from-blue-600 hover:to-blue-700 transition duration-200 shadow-md"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid md:hidden gap-4 mt-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white/80 backdrop-blur shadow-lg rounded-xl p-5 border border-gray-200 transition hover:shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-mono text-gray-500">#{order._id}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <div className="space-y-2 mb-3">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ₹{item.product.discounted_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-gray-800">
              Total: ₹{order.totalAmount}
            </p>
            <button
              onClick={() => handleInvoice(order._id)}
              className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 hover:from-blue-600 hover:to-blue-700 transition shadow-md"
            >
              View Invoice
            </button>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #4b6cb7, #182848);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #3b5ca6, #121a33);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4b6cb7 #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
