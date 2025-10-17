import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategories } from "../api/category.api";

const HeroCard = ({ card }) => (
  <div className="bg-[#efccd2] rounded-2xl p-8 md:p-6 md:mr-0 mr-3 h-58 flex relative overflow-hidden shadow-md">
    <div className="flex flex-col justify-between h-full z-10 flex-1 pr-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 leading-tight">{card.name}</h3>
        <p className="text-sm text-gray-600 opacity-80 mt-2 line-clamp-2">{card.description || "Explore this category"}</p>
      </div>
      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium w-fit transition-colors duration-200">
        Shop Now
      </button>
    </div>
    <div className="relative w-44 h-full flex items-center justify-center overflow-hidden">
      <img src={card.image} alt={card.name} className="object-cover w-full h-full rounded-lg" />
    </div>
  </div>
);

export default function Hero() {
  const [data, setData] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res?.success) setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setSlidesPerView(3);
      else if (window.innerWidth >= 1024) setSlidesPerView(2.5);
      else if (window.innerWidth >= 768) setSlidesPerView(2);
      else if (window.innerWidth >= 640) setSlidesPerView(1.5);
      else setSlidesPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.length]);

  // Duplicate data for infinite loop effect
  const displayData = [...data, ...data];

  const translateX = -(offset * (100 / slidesPerView));

  return (
    <section className="mt-8 relative overflow-hidden">
      {/* Nav Buttons */}
      <button
        onClick={() => setOffset((prev) => (prev - 1 + data.length) % data.length)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg items-center justify-center hover:scale-105 transition-transform"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => setOffset((prev) => (prev + 1) % data.length)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg items-center justify-center hover:scale-105 transition-transform"
      >
        <ChevronRight size={20} />
      </button>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-700 ease-out gap-1 md:gap-4 lg:gap-5"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {displayData.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <HeroCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
