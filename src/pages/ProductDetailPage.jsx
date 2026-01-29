import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/products.api";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { userCustomizeHamper } from "../api/hamper.api";
import PageLoader from "../Pageloader/Pageloader";
import ImageUploader from "../Component/common/ImageUploader";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);
  const [showProductInfo, setShowProductInfo] = useState(true);
  const [loading, setLoading] = useState(true);

  // Personalize Modal States
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [giftImageFiles, setGiftImageFiles] = useState([]);


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

  // ---------------- Convert Image → Base64 ----------------
  // const handleImageChange = (file) => {
  //   if (!file) return;
  //   setGiftImage(file);

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result); // base64 preview
  //   };
  //   reader.readAsDataURL(file);
  // };

  // ---------------- Personalization Submit ----------------
  const handleCustomizeSubmit = async () => {
    if (!giftMessage && !giftImage) {
      toast.error("Please enter a message or upload an image!");
      return;
    }

    const fd = new FormData();
    fd.append("message", giftMessage);

    if (giftImageFiles.length > 0) {
      fd.append("image", giftImageFiles[0]);
    }

    userCustomizeHamper(fd, product._id);


    try {
      const res = await userCustomizeHamper(payload, product._id);
      if (res.success) {
        toast.success(res.message || "Hamper customized successfully!");
      }
      setShowCustomizeModal(false);
      setGiftMessage("");
      setGiftImageFiles([]);
      // setImagePreview("");
    } catch (err) {
      toast.error("Failed to customize hamper");
      console.error(err);
    }
  };

  // ---------------- Add To Cart (FIXED) ----------------
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to buy Product!");
      navigate("/login");
      return;
    }

    try {
      // 🔴 OLD CODE (Caused the error): 
      // await addToCart(product._id, quantity);

      // 🟢 NEW FIXED CODE: Pass as a single object
      await addToCart({
        itemId: product._id,
        quantity: quantity
      });

      toast.success("Item added to cart!");
      navigate("/cart");
    } catch (err) {
      console.error("Add to Cart Error:", err);
      toast.error("Failed to add product to cart");
    }
  };

  // ---------------- Loading / Error ----------------
  if (loading)
    return <div className="flex justify-center py-20"> <PageLoader /></div>;
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
    <div className=" bg-white">
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
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Side Images */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden">
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
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${selectedImage === img
                    ? "border-gray-900"
                    : "border-gray-200"
                    }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹ {product.discounted_price}
                </span>

                {product.mrp_price && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹ {product.mrp_price}
                  </span>
                )}

                {discountPercentage > 0 && (
                  <span className="text-green-600 font-semibold">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Description Accordion */}
              <div className="border border-gray-200 rounded-xl my-3">
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="font-semibold text-gray-900">
                    Description
                  </span>
                  {showDescription ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>

                {showDescription && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="border border-gray-200 rounded-xl mb-6">
                <button
                  onClick={() => setShowProductInfo(!showProductInfo)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <span className="font-semibold text-gray-900">
                    Product Info
                  </span>
                  {showProductInfo ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showProductInfo && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {product.category?.name}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Quantity:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                    className="w-7 h-7 border rounded-full flex items-center justify-center"
                  >
                    <Minus />
                  </button>

                  <span className="text-xl font-bold min-w-[2rem] text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="w-7 h-7 border rounded-full flex items-center justify-center"
                  >
                    <Plus />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between border-t py-4">
                <span className="text-lg font-semibold">Sub Total</span>
                <span className="text-2xl font-bold">
                  ₹ {(product.discounted_price * quantity).toFixed(2)}
                </span>
              </div>

              {/* PERSONALISE BUTTON */}
              <button
                onClick={() => setShowCustomizeModal(true)}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold mt-3"
              >
                Personalise This Hamper
              </button>
              <div className="mt-5">
                {/* Checkout */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>


          </div>
        </div>

        {/* ---------------- CUSTOMIZE MODAL ---------------- */}
        {showCustomizeModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold mb-4">Customize Your Hamper</h2>

              {/* Message */}
              <label className="block mb-2 font-medium">Gift Message</label>
              <textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
                rows={4}
                placeholder="Write your personalized message..."
              />

              {/* Image */}
              <label className="block mb-2 font-medium">Gift Image</label>
              <ImageUploader
                images={giftImageFiles}
                onChange={setGiftImageFiles}
                multiple={false}
                maxFiles={1}
                label="Upload Gift Image"
              />


              {/* {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
              )} */}

              {/* Submit */}
              <button
                onClick={handleCustomizeSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
              >
                Save Customization
              </button>
            </div>
          </div>
        )}

        {/* Add Ons */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Add Ons</h2>
          <p className="text-gray-600 mb-6">
            Discover the perfect gift for every occasion
          </p>
          <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            Coming Soon...
          </div>
        </div>
      </div>
    </div>
  );
}