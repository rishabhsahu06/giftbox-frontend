import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/category.api";
import { Routers } from "../constants/router";

/* ================= HERO CARD ================= */
const PLACEHOLDER =
  "https://via.placeholder.com/400x400?text=No+Image";

const HeroCard = ({ card, index }) => {
  const navigate = useNavigate();

  const backgrounds = [
    "linear-gradient(135deg, #ffc3d5 0%, #ffd4e5 100%)",
    "linear-gradient(135deg, #fff4b5 0%, #fffbd0 100%)",
    "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%)",
    "linear-gradient(135deg, #ffd4a3 0%, #ffe5c4 100%)",
    "linear-gradient(135deg, #d4e8ff 0%, #e5f2ff 100%)",
    "linear-gradient(135deg, #e8d4ff 0%, #f2e5ff 100%)",
  ];

  const handleClick = () => {
    navigate(Routers.AllCategoryPage);
  };

  return (
    <div
      className="rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 h-[190px] sm:h-[210px] lg:h-[230px] flex relative overflow-hidden shadow-md"
      style={{ background: backgrounds[index % backgrounds.length] }}
    >
      <div className="flex flex-col justify-between h-full z-10 flex-1 pr-4 max-w-[55%]">
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
            {card?.name || "Category"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
            {card?.description || "Special gifts"}
          </p>
        </div>

        <button
          onClick={handleClick}
          className="bg-[#ff3b5c] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold w-fit"
        >
          Shop Now
        </button>
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[180px] lg:h-[180px]">
        <img
          src={card?.image || PLACEHOLDER}
          alt={card?.name || "Category"}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

/* ================= HERO SECTION ================= */
export default function Hero() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  /* Fetch categories */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res?.success && Array.isArray(res?.data)) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  /* Responsive slides */
  useEffect(() => {
    const updateSlides = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesPerView(3);
      else if (w >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const maxIndex = Math.max(0, data.length - slidesPerView);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  if (!data?.length) {
    return (
      <section className="mt-6 px-4">
        <div className="animate-pulse bg-gray-200 rounded-2xl h-[220px]" />
      </section>
    );
  }

  return (
    <section className="mt-6 px-3 sm:px-4 lg:px-8 relative">
      {/* Navigation buttons */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        disabled={index >= maxIndex}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white w-9 h-9 rounded-full shadow flex items-center justify-center disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / slidesPerView)}%)`,
          }}
        >
          {data.map((card, i) => (
            <div
              key={card?._id || i}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
            >
              <HeroCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-6 bg-[#ff3b5c]"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}