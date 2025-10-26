import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/products.api";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isLoggedIn = !!localStorage.getItem("accessToken"); // or get it from context

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showProductInfo, setShowProductInfo] = useState(true);
  const [loading, setLoading] = useState(true);

  // ---------------- Fetch Product ----------------
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        const prod = res.data;
        setProduct(prod);
        setSelectedImage(prod.images?.[0] || "");
      } catch (err) {
        console.error("Product Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ---------------- Quantity Change ----------------
  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increment") return prev + 1;
      if (type === "decrement" && prev > 1) return prev - 1;
      return prev;
    });
  };

  // ---------------- Add To Cart ----------------
  const handleAddToCart = async () => {
    const isLoggedIn = !!localStorage.getItem("accessToken"); // check login
    if (!isLoggedIn) {
      toast.error("You must be logged in to buy Product !");
      navigate("/login"); // optional: redirect after toast
      return;
    }

    if (!product?._id) {
      toast.error("Product not found!");
      return;
    }

    try {
      await addToCart(product._id, quantity);
      toast.success("Item added to cart!");
      navigate("/cart");
    } catch (err) {
      console.error("Add to Cart Error:", err);
      toast.error("Failed to add product to cart");
    }
  };


  // ---------------- Loading / Error ----------------
  if (loading)
    return <div className="flex justify-center py-20">Loading...</div>;
  if (!product)
    return (
      <p className="text-center py-20 text-gray-500">Product not found</p>
    );

  const discountPercentage =
    product.mrp_price && product.discounted_price
      ? Math.round(
        ((product.mrp_price - product.discounted_price) /
          product.mrp_price) *
        100
      )
      : 0;

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap gap-2 text-sm mb-6">
          <button
            onClick={() => navigate("/")}
            className="font-semibold hover:underline"
          >
            All Categories
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold">
            {product.category?.name || "Product"}
          </span>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 ${selectedImage === img
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Title + Price */}
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  ₹ {product.discounted_price || product.price}
                </span>
                {product.mrp_price && (
                  <span className="text-xl md:text-2xl text-gray-400 line-through">
                    ₹ {product.mrp_price}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="text-green-600 font-semibold">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>

              {product.stock <= 20 && product.stock > 0 && (
                <p className="text-red-500 text-sm font-medium">
                  Only {product.stock} Left
                </p>
              )}

              {/* Description Accordion */}
              <div className="border border-gray-200 rounded-xl my-5">
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    Description
                  </span>
                  {showDescription ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {showDescription && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.description || "No description available."}
                    </p>
                  </div>
                )}
              </div>

              {/* Product Info Accordion */}
              <div className="border border-gray-200 rounded-xl mb-6">
                <button
                  onClick={() => setShowProductInfo(!showProductInfo)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    Product Info
                  </span>
                  {showProductInfo ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {showProductInfo && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm text-gray-600">
                      {product.category?.name || "Single Item"}
                    </p>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-gray-900">
                    Quantity:
                  </span>
                  <span className="font-semibold text-gray-900">
                    {quantity}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                    className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5 text-gray-900" />
                  </button>
                  <span className="text-xl font-bold text-gray-900 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Plus className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              </div>

              {/* Sub Total */}
              <div className="flex items-center justify-between mb-6 py-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">
                  Sub Total
                </span>
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  ₹{" "}
                  {(
                    (product.discounted_price || product.price) * quantity
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold text-base transition uppercase tracking-wide"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Add Ons Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Ons</h2>
          <p className="text-gray-600 mb-6">
            Discover the perfect gift for every occasion
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* You can map add-ons here */}
            <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 text-sm">
              Coming Soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
