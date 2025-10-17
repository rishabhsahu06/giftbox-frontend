import React, { useState, useEffect } from "react";
import { Mail, Lock, X, ArrowRight, Loader2, EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/user";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import { toast } from "sonner";
import PageLoader from "../Pageloader/Pageloader";
import loginImg from "../assets/loginsingup/signin.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [forgotOpen, setForgotOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };
      const response = await userLogin(payload);

      // Save both access and refresh tokens
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      toast.success("Welcome back 👋", {
        description: "You have successfully logged in!",
      });

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Try again."
      );
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    const clientId = "131623985538-eke22ombjuh4u0acprlrse9ugmhpb1pf.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:5173/oauth2/redirect");
    const scope = encodeURIComponent("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile");
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = oauthUrl;

  };

  return (
    <>
      {loading && <PageLoader loading={loading} />}

      <div className="flex items-center justify-center p-4 min-h-screen bg-gray-50">
        <div className="bg-white flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Left Image Section */}
          <div className="hidden md:flex w-1/2 bg-[#fbe9e7] items-center justify-center relative overflow-hidden rounded-xl">
            <img
              onClick={() => navigate("/")}
              src={loginImg}
              alt="Login Visual"
              className="w-full h-full object-contain md:object-cover rounded-xl drop-shadow-xl transition-transform duration-500 hover:scale-105 cursor-pointer"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 p-8 relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Sign in to your account to continue
            </p>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative border rounded-xl">
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-9 w-full h-11 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative border rounded-xl">
                  <Lock className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9 pr-9 w-full h-11 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    required
                  />

                  {/* Eye icon toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "SIGN IN"}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center text-gray-500 text-sm my-4">
                <span className="w-1/3 border-b border-gray-200"></span>
                <span className="px-2">OR</span>
                <span className="w-1/3 border-b border-gray-200"></span>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
                className="w-full h-12 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                {isGoogleLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
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
            </form>

            {/* Signup Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Don’t have an account? </span>
              <Link
                to="/register"
                className="text-red-500 hover:text-red-600 font-medium inline-flex items-center gap-1"
              >
                Sign Up Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordPopup
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </>
  );
};

export default LoginPage;
