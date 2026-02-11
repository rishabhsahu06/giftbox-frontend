"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReusableForm from "../Component/UI/ReusableForm";
import { Mail, Lock, User, Phone } from "lucide-react";
import image from "../assets/loginsingup/signup.png";
import { userRegister, verifyOTP } from "../api/user";
import { toast } from "sonner";
import PageLoader from "../Pageloader/Pageloader";
import { Routers } from "../constants/router";
// import OTPPopup from "./OTPPopup";
// import { userRegister } from "../api/user";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // OTP state remains commented
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("");
  const [userIdentifier, setUserIdentifier] = useState("");

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    const clientId = "131623985538-eke22ombjuh4u0acprlrse9ugmhpb1pf.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:5174/oauth2/redirect");
    const scope = encodeURIComponent("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = oauthUrl;

  };
  // const handleVerifyOTP = async (enteredOtp) => {
  //   try {
  //     const response = await verifyOTP(userIdentifier, enteredOtp);

  //     if (response?.success) {
  //       if (storedPayload) {
  //         try {
  //           const cryptoRes = await userCryptoRegister(storedPayload);
  //           console.log("Crypto Register Response:", cryptoRes);
  //         } catch (cryptoErr) {
  //           console.error("Crypto Register Error:", cryptoErr);
  //         }
  //       }

  //       Swal.fire({
  //         icon: "success",
  //         title: "OTP Verified",
  //         text: response?.message || "Your account has been created!",
  //         confirmButtonColor: "#22c55e",
  //       }).then(() => {
  //         setOtpOpen(false);
  //         navigate("/login");
  //       });
  //     }
  //   } catch (err) {
  //     console.error("OTP Verification Error:", err.response || err.message);
  //     Swal.fire({
  //       icon: "error",
  //       title: "OTP Verification Failed",
  //       text: err.response?.data?.message || "Please try again.",
  //       confirmButtonColor: "#ef4444",
  //     });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { name, email, phone, password } = formData;
      const response = await userRegister({ name, email, phone, password });
      console.log("Register API Response:", response);

      // Extract expected data
      const data = response.data?.data;
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;
      const user = data?.user;

      if (accessToken && refreshToken && user) {
        // ✅ Save tokens with consistent key names
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Registration Successful!");

        // ✅ Navigate to dashboard after successful registration
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Invalid response from server");
        console.warn("Unexpected response format:", response);
      }
    } catch (err) {
      console.error("Registration Error:", err.response || err.message);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader loading={loading} />}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r relative">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 backdrop-blur-lg bg-white/60 rounded-2xl shadow-sm overflow-hidden border border-white/40 relative">

          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-full transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Image */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200">
            <Link to="/">
              <img
                src={image}
                alt="Register Illustration"
                className="h-full object-contain drop-shadow-2xl rounded-l-2xl"
              />
            </Link>
          </div>

          {/* Right Form */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-3 text-gray-800 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Join <span className="font-semibold text-yellow-600">Hetal Gifts</span> and start your shopping journey with us!
            </p>

            {error && (
              <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReusableForm label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your name" required icon={User} />
                <ReusableForm label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required icon={Mail} />
              </div>

              <ReusableForm label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required icon={Phone} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReusableForm label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required icon={Lock} />
                <ReusableForm label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" required icon={Lock} />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="terms" className="h-4 w-4 accent-yellow-500" required />
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the <Link to={Routers.termsCondition} className="text-yellow-600 hover:underline">Terms & Conditions</Link>
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-500 via-orange-400 to-red-400 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition duration-300 disabled:opacity-50">
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full h-12 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              {isGoogleLoading ? (
                <span className="animate-spin w-5 h-5 border-2 border-gray-400 rounded-full"></span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-700 mt-6">
              Already have an account? <Link to="/login" className="text-yellow-600 font-medium hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* <OTPPopup isOpen={otpOpen} onClose={() => setOtpOpen(false)} onVerify={handleVerifyOTP} otpSentTo={otpSentTo} /> */}
    </>
  );
};

export default RegisterPage;
