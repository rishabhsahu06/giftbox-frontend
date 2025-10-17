import React, { useEffect, useState } from "react";
import { Package, Truck, Store, Phone, Check, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import PageLoader from "../Pageloader/Pageloader";
import {
  getUserAddressesAPI,
  addAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  setDefaultAddressAPI,
} from "../api/products.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const AddressCheckoutPage = () => {
  const { cart, totalMRP, totalPrice, totalSavings, fetchCart, loading } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("standard");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentAddress, setCurrentAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    phone: "", // Add this
    alternateNo: "",
    isDefault: false,
  });


  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const data = await getUserAddressesAPI();
      console.log(data, "dfghjkl");
      // Check if data.data is an array and has at least one element
      const list = data.data && data.data.length > 0 ? data.data : [];
      setAddresses(list);
      const defaultAddr = list.find((a) => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
      setLoadingAddresses(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch addresses");
      setLoadingAddresses(false);
    }
  };


  const openAddModal = () => {
    setModalType("add");
    setCurrentAddress({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      alternateNo: "",
      isDefault: false,
    });
    setShowModal(true);
  };

  const openEditModal = (addr) => {
    setModalType("edit");
    setCurrentAddress({ ...addr });
    setShowModal(true);
  };

  const handleSaveAddress = async () => {
    const { _id, name, address, city, state, pincode, landmark, alternateNo, isDefault, phone } = currentAddress;
    if (!name || !address || !city || !state || !pincode) {
      return toast.error("Please fill all required fields");
    }
    try {
      if (modalType === "add") {
        await addAddressAPI({
          name,
          address,
          city,
          state,
          pincode,
          landmark,
          alternateNo,
          isDefault,
          phone,
        });
        toast.success("Address added!");
      } else if (modalType === "edit") {
        await updateAddressAPI(
          {
            name,
            address,
            city,
            state,
            pincode,
            landmark,
            alternateNo,
            isDefault,
            phone,
          },
          _id
        );
        toast.success("Address updated!");
      }
      setShowModal(false);
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Failed to save address");
    }
  };


  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteAddressAPI(id);
      toast.success("Address deleted!");
      if (selectedAddress?._id === id) setSelectedAddress(null);
      fetchAddresses();
    } catch (err) {
      toast.error(err.message || "Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddressAPI(id);
      toast.success("Default address set!");
      fetchAddresses();
    } catch (err) {
      toast.error(err.message || "Failed to set default address");
    }
  };

  if (loading || loadingAddresses) return <PageLoader />;
  if (!cart || cart.length === 0)
    return <p className="p-6 text-center text-xl">Your cart is empty.</p>;

  const deliveryOptions = [
    { id: "standard", icon: Package, title: "Standard Delivery", subtitle: "Typically delivers between 3-5 days*" },
    { id: "express", icon: Truck, title: "Express Delivery", subtitle: "Same day or next day delivery" },
    { id: "pickup", icon: Store, title: "Store Pickup", subtitle: "Pick up from nearest store" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">DELIVERY OPTIONS AVAILABLE</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deliveryOptions.map((option) => {
                const Icon = option.icon;
                const selected = selectedDeliveryOption === option.id;
                return (
                  <div
                    key={option.id}
                    onClick={() => setSelectedDeliveryOption(option.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selected ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${selected ? "border-black bg-black" : "border-gray-300"
                          }`}
                      >
                        {selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-500">{option.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Address Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">SELECT DELIVERY ADDRESS</h2>

            {addresses.map((addr) => {
              const selected = selectedAddress?._id === addr._id;
              return (
                <div
                  key={addr._id}
                  onClick={() => setSelectedAddress(addr)}
                  className={`p-4 rounded-lg border-2 cursor-pointer mb-4 transition-all ${selected ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mt-1 mr-4 flex items-center justify-center ${selected ? "border-black bg-black" : "border-gray-300"
                          }`}
                      >
                        {selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2 space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded">HOME</span>
                          {addr.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-xs font-medium text-green-700 rounded flex items-center">
                              <Check className="w-3 h-3 mr-1" /> DEFAULT
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{addr.name}</h3>
                        <p className="text-gray-600 mb-2">
                          {addr.address}, {addr.landmark && `${addr.landmark}, `}{addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        {addr.alternateNo && (
                          <p className="text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-1" /> {addr.phone} / {addr.alternateNo}
                          </p>
                        )}
                        {!addr.alternateNo && (
                          <p className="text-gray-600 flex items-center">
                            <Phone className="w-4 h-4 mr-1" /> {addr.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditModal(addr); }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr._id); }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                      {!addr.isDefault && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSetDefault(addr._id); }}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={openAddModal}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center text-gray-600 font-medium"
            >
              <Plus className="w-5 h-5 mr-2" /> ADD NEW ADDRESS
            </button>
          </div>
        </div>

        {/* Right Section - Price Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">PRICE DETAILS</h3>
            <div className="space-y-4">
              <div className="flex justify-between"><span>Total MRP</span><span>₹{totalMRP.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Offer Discount</span><span className="text-green-600">- ₹{totalSavings.toFixed(2)}</span></div>
              <div className="flex justify-between text-red-600 font-medium"><span>Your Total Savings</span><span>₹{totalSavings.toFixed(2)}</span></div>
              <div className="flex justify-between text-green-600"><span>Delivery Fee</span><span>Free</span></div>
              <hr />
              <div className="flex justify-between font-semibold text-lg"><span>Total Payable Amount</span><span>₹{totalPrice.toFixed(2)}</span></div>
            </div>
            <Link
              to="/cart/payment"
              state={{
                addressId: selectedAddress?._id,
                totalAmount: totalPrice,
                totalMRP,
                totalSavings,
              }}
            >
              <button
                disabled={!selectedAddress}
                className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg cursor-pointer transition-colors ${selectedAddress
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
              >
                CONTINUE
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">{modalType === "add" ? "Add New Address" : "Edit Address"}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={currentAddress.name || ""}
                onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={currentAddress.address || ""}
                onChange={(e) => setCurrentAddress({ ...currentAddress, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Landmark"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={currentAddress.landmark || ""}
                onChange={(e) => setCurrentAddress({ ...currentAddress, landmark: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={currentAddress.city || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={currentAddress.state || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={currentAddress.pincode || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, pincode: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={currentAddress.phone || ""}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, phone: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Alternate Phone Number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                value={currentAddress.alternateNo || ""}
                onChange={(e) => setCurrentAddress({ ...currentAddress, alternateNo: e.target.value })}
              />
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={currentAddress.isDefault || false}
                  onChange={(e) => setCurrentAddress({ ...currentAddress, isDefault: e.target.checked })}
                  id="isDefault"
                  className="w-4 h-4"
                />
                <label htmlFor="isDefault" className="text-gray-700">Set as default address</label>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 rounded-lg hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={handleSaveAddress} className="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCheckoutPage;
