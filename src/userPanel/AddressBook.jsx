import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import ReusableForm from "../Component/UI/ReusableForm";
import {
  crateAddress,
  updateAddress,
  deleteAddress,
  getAddress,
} from "../api/address.api";
import { toast } from 'sonner'; // <-- Import toast
import PageLoader from "../Pageloader/Pageloader";

const emptyForm = {
  address: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  alternateNo: "",
  isDefault: false,
};

const AddressBook = () => {
  const [form, setForm] = useState(emptyForm);
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await getAddress();
      const data = res?.data.data || [];
      setAddresses(Array.isArray(data) ? data : []);
      toast.success("Addresses fetched successfully!");
    } catch (err) {
      toast.error("Failed to fetch addresses");
      console.error(err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.address.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.state.trim()) return "State is required";
    if (!form.pincode.trim()) return "Pincode is required";
    if (!/^\d{6}$/.test(form.pincode)) return "Pincode must be 6 digits";
    if (!form.alternateNo.trim()) return "Phone number is required";
    if (!/^\d{10,15}$/.test(form.alternateNo))
      return "Phone number must be 10-15 digits";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    try {
      if (editingId) {
        await updateAddress({ ...form, addressId: editingId });
        toast.success("Address updated successfully!");
      } else {
        await crateAddress({ ...form });
        toast.success("Address added successfully!");
      }
      setForm(emptyForm);
      setEditingId(null);
      await fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving address");
      console.error(err);
    }
  };

  const handleEdit = (addr) => {
    setForm({
      _id: addr._id,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      landmark: addr.landmark,
      alternateNo: addr.alternateNo,
      isDefault: addr.isDefault,
    });
    setEditingId(addr._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteAddress(id);
      toast.success("Address deleted successfully!");
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete address");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  return (
    <>
      {loading && <PageLoader loading={loading} />}

      <div className="mx-auto sm:p-6 p-0">
        {/* Add/Edit Address Form */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Address" : "Add Address"}
            </h2>
            {editingId && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
              >
                <X size={14} /> Cancel
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <ReusableForm
              label="Address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="House / Street / Building"
              required
              className="sm:col-span-2"
            />
            <ReusableForm
              label="Landmark"
              name="landmark"
              type="text"
              value={form.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark"
              className="sm:col-span-2"
            />
            <ReusableForm
              label="City"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
            <ReusableForm
              label="State"
              name="state"
              type="text"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
            <ReusableForm
              label="Pincode"
              name="pincode"
              type="text"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              required
            />
            <ReusableForm
              label="Phone"
              name="alternateNo"
              type="text"
              value={form.alternateNo}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm">Set as default address</label>
            </div>
            <div className="sm:col-span-2 flex">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus size={16} />
                {editingId ? "Update Address" : "Add Address"}
              </button>
            </div>
          </form>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        {/* Address List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
          {Array.isArray(addresses) && addresses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition ${addr.isDefault ? "border-indigo-600" : "border-gray-200"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {addr.isDefault && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(addr)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(addr._id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 font-medium">
                    {addr.alternateNo || "No phone number"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {addr.address}
                    {addr.landmark && `, ${addr.landmark}`}
                    <br />
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No addresses yet. Add one above.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressBook;
