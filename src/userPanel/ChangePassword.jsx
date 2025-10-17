"use client";
import React, { useState } from "react";
import ReusableForm from "../Component/UI/ReusableForm";
import { toast } from "sonner";
import { X } from "lucide-react";
import { changePassword } from "../api/user";
import PageLoader from "../Pageloader/Pageloader";

const emptyForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.currentPassword.trim()) return "Current password is required";
    if (form.newPassword.length < 6)
      return "New password must be at least 6 characters";
    if (form.newPassword !== form.confirmPassword)
      return "New password and confirm password do not match";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      if (res?.data?.success) {
        toast.success(res.data.message || "Password changed successfully!");
        setForm(emptyForm);
      } else {
        toast.error(res?.data?.message || "Failed to change password");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.error("Change password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setError("");
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto sm:p-6 p-0">
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
          >
            <X size={14} /> Reset
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <ReusableForm
            label="Current Password"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            required
            className="sm:col-span-2"
          />

          <ReusableForm
            label="New Password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            className="sm:col-span-2"
          />

          <ReusableForm
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter new password"
            required
            className="sm:col-span-2"
          />

          <div className="sm:col-span-2 flex">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
