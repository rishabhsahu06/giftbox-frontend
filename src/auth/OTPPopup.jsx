"use client";
import React, { useState } from "react";

const OTPPopup = ({ isOpen, onClose, onVerify, otpSentTo }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setError("");
    onVerify(enteredOtp);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Verify OTP
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter the 6-digit code sent to your {otpSentTo}
        </p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center border rounded-lg text-xl focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          ))}
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-yellow-500 via-orange-400 to-red-400 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTPPopup;
