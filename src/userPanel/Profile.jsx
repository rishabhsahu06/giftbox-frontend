import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { userDetails } from "../api/user";
import { getUserOrders } from "../api/products.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PageLoader from "../Pageloader/Pageloader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch user details
  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      try {
        if (isMounted) setLoadingUser(true);
        const response = await userDetails();
        if (response?.data?.success && isMounted) {
          setUser(response.data.data);
          toast.success("User details loaded successfully ✅");
        } else {
          toast.error("Failed to load user details ❌");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Something went wrong while fetching user details!");
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    };

    fetchUserDetails();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch orders
  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        if (isMounted) setLoadingOrders(true);
        const response = await getUserOrders();
        if (isMounted) {
          setOrders(response?.orders || []);
          // toast.success("Orders fetched successfully 🛍️");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (isMounted) toast.error("Failed to load orders ❌");
        setOrders([]);
      } finally {
        if (isMounted) setLoadingOrders(false);
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Show full-screen overlay loader while fetching data
  if (loadingUser || loadingOrders) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6 sm:px-4 px-0 bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Personal Information
          </h3>

          {user ? (
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">
                  {user.name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium flex items-center gap-2 text-gray-900">
                  <Mail size={16} className="text-indigo-500" />{" "}
                  {user.email || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium flex items-center gap-2 text-gray-900">
                  <Phone size={16} className="text-green-500" />{" "}
                  {user.contact_no || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">
                  {user.createdAt
                    ? new Date(user.createdAt).toDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Failed to load user details.</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Recent Orders
          </h3>

          {orders.length > 0 ? (
            <>
              <div className="space-y-4">
                {orders.slice(0, 2).map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between border-b pb-3 last:border-none last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Order #{order._id?.slice(-6) || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ₹{order.totalAmount || "0.00"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </div>
                ))}
              </div>

              {orders.length > 2 && (
                <div className="mt-4 text-right">
                  <Link to="/dashboard/myOrders">
                    <button className="text-indigo-600 hover:underline text-sm font-medium">
                      View All Orders
                    </button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm">No recent orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
