import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { getHamperById } from "../../api/hamper.api";
import { useCart } from "../../context/CartContext";
import PageLoader from "../../Pageloader/Pageloader";

/* ================= HELPERS ================= */
const PLACEHOLDER =
  "https://via.placeholder.com/600x600?text=No+Image";

const safeImg = (img) => img || PLACEHOLDER;

/* ================= COMPONENT ================= */
export default function HamperDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [hamper, setHamper] = useState(null);
  const [selectedImage, setSelectedImage] = useState(PLACEHOLDER);
  const [quantity, setQuantity] = useState(1);
  const [showDesc, setShowDesc] = useState(true);
  const [showInside, setShowInside] = useState(true);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchHamper = async () => {
      try {
        setLoading(true);
        const res = await getHamperById(id);
        const data = res?.data?.data || res?.data || res;

        if (!data?._id) throw new Error("Invalid hamper");

        setHamper(data);
        setSelectedImage(safeImg(data.image));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load hamper");
      } finally {
        setLoading(false);
      }
    };

    fetchHamper();
  }, [id]);

  /* ================= THUMBNAILS ================= */
  const thumbnails = useMemo(() => {
    if (!hamper) return [];
    return [
      hamper.image && { label: "Hamper", image: hamper.image },
      hamper.category?.image && {
        label: "Category",
        image: hamper.category.image,
      },
      hamper.box?.image && { label: "Box", image: hamper.box.image },
      hamper.card?.image && { label: "Card", image: hamper.card.image },
    ].filter(Boolean);
  }, [hamper]);

  /* ================= ACTIONS ================= */
  const changeQty = (type) => {
    setQuantity((q) =>
      type === "inc" ? q + 1 : q > 1 ? q - 1 : q
    );
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        itemId: hamper._id,
        quantity,
      });
      toast.success("Hamper added to cart");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      toast.error("Add to cart failed");
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <PageLoader />
      </div>
    );
  }

  if (!hamper) {
    return (
      <p className="text-center py-20 text-gray-500">
        Hamper not found
      </p>
    );
  }

  const discount =
    hamper.mrp_price && hamper.price
      ? Math.round(
          ((hamper.mrp_price - hamper.price) /
            hamper.mrp_price) *
            100
        )
      : 0;

  /* ================= UI ================= */
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button
            onClick={() => navigate("/")}
            className="font-semibold hover:underline"
          >
            All Hampers
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold capitalize">
            {hamper.category?.name || "Gift Hamper"}
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= LEFT: IMAGES ================= */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Thumbnails */}
            {thumbnails.length > 0 && (
              <div
                className="
                  flex lg:flex-col gap-3
                  order-2 lg:order-1
                  overflow-x-auto lg:overflow-y-auto
                "
              >
                {thumbnails.map((t, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSelectedImage(safeImg(t.image))
                    }
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0
                      ${
                        selectedImage === t.image
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    <img
                      src={safeImg(t.image)}
                      alt={t.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center py-0.5">
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* BIG IMAGE (PERFECT MOBILE + DESKTOP) */}
            <div className="w-full flex justify-center order-1 lg:order-2">
              <div
                className="
                  w-full
                  aspect-square
                  bg-gray-50
                  rounded-2xl
                  overflow-hidden

                  /* desktop size control only */
                  lg:max-w-[480px]
                  xl:max-w-[520px]
                "
              >
                <img
                  src={safeImg(selectedImage)}
                  alt={hamper.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT: INFO ================= */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {hamper.name}
              </h1>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold">
                  ₹ {hamper.price}
                </span>
                {hamper.mrp_price && (
                  <span className="line-through text-gray-400">
                    ₹ {hamper.mrp_price}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-green-600 font-semibold">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="border rounded-xl mb-4">
                <button
                  onClick={() => setShowDesc(!showDesc)}
                  className="w-full flex justify-between p-4"
                >
                  <span className="font-semibold">
                    Description
                  </span>
                  {showDesc ? <ChevronUp /> : <ChevronDown />}
                </button>
                {showDesc && (
                  <p className="px-4 pb-4 text-sm text-gray-600">
                    {hamper.description ||
                      "No description available."}
                  </p>
                )}
              </div>

              {/* WHAT'S INSIDE */}
              <div className="border rounded-xl mb-6">
                <button
                  onClick={() => setShowInside(!showInside)}
                  className="w-full flex justify-between p-4"
                >
                  <span className="font-semibold">
                    What's Inside?
                  </span>
                  {showInside ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showInside && (
                  <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
                    {hamper.box && (
                      <div className="flex justify-between">
                        <span>Box</span>
                        <span className="font-medium">
                          {hamper.box.name}
                        </span>
                      </div>
                    )}
                    {hamper.card && (
                      <div className="flex justify-between">
                        <span>Card</span>
                        <span className="font-medium">
                          {hamper.card.name}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => changeQty("dec")}
                  disabled={quantity <= 1}
                  className="border rounded-full p-1 disabled:opacity-50"
                >
                  <Minus />
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  onClick={() => changeQty("inc")}
                  className="border rounded-full p-1"
                >
                  <Plus />
                </button>
              </div>

              {/* SUBTOTAL */}
              <div className="flex justify-between border-t pt-4">
                <span className="font-semibold">
                  Sub Total
                </span>
                <span className="font-bold text-xl">
                  ₹ {(hamper.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* CHECKOUT */}
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold uppercase"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
