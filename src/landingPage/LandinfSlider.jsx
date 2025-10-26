import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategories } from "../api/category.api";

const HeroCard = ({ card, index }) => {
  // Different gradient backgrounds for each card
  const backgrounds = [
    "linear-gradient(135deg, #ffc3d5 0%, #ffd4e5 100%)", // Pink
    "linear-gradient(135deg, #fff4b5 0%, #fffbd0 100%)", // Yellow
    "linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%)", // Gray
    "linear-gradient(135deg, #ffd4a3 0%, #ffe5c4 100%)", // Orange
    "linear-gradient(135deg, #d4e8ff 0%, #e5f2ff 100%)", // Blue
    "linear-gradient(135deg, #e8d4ff 0%, #f2e5ff 100%)"  // Purple
  ];

  return (
    <div 
      className="rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 h-[190px] sm:h-[200px] lg:h-[230px] flex relative overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
      style={{ background: backgrounds[index % backgrounds.length] }}
    >
      <div className="flex flex-col justify-between h-full z-10 flex-1 pr-4 sm:pr-6 max-w-[50%] sm:max-w-[55%]">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-800 leading-tight">
            {card.name}
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-700 opacity-90 line-clamp-2">
            {card.description || "Surprise them with extra special gifts"}
          </p>
        </div>
        <button className="bg-[#ff3b5c] hover:bg-[#ff1744] text-white px-5 sm:px-6 lg:px-8 py-2 lg:py-2.5 rounded-full text-xs sm:text-sm font-semibold w-fit transition-all duration-200 shadow-md hover:shadow-lg">
          Order Now
        </button>
      </div>
      <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[180px] sm:h-[200px] lg:w-[200px] lg:h-[180px] ">
        <img 
          src={card.image} 
          alt={card.name} 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default function Hero() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch categories from your existing API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res?.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setSlidesPerView(3);
      else if (width >= 1024) setSlidesPerView(2.5);
      else if (width >= 768) setSlidesPerView(2);
      else if (width >= 640) setSlidesPerView(1.2);
      else setSlidesPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll every 4 seconds
  useEffect(() => {
    if (data.length === 0) return;
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= data.length) {
          return 0;
        }
        return nextIndex;
      });
      setTimeout(() => setIsAnimating(false), 700);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [data.length]);

  const handleNext = () => {
    if (isAnimating || data.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handlePrev = () => {
    if (isAnimating || data.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const translateX = -(currentIndex * (100 / slidesPerView));

  if (data.length === 0) {
    return (
      <section className="mt-6 sm:mt-8 px-3 sm:px-4 lg:px-8">
        <div className="animate-pulse bg-gray-200 rounded-2xl lg:rounded-3xl h-[220px] sm:h-[240px] lg:h-[260px]"></div>
      </section>
    );
  }

  return (
    <section className="mt-6 sm:mt-8 px-3 sm:px-4 lg:px-8 relative">
      {/* Navigation Buttons - Desktop Only */}
      <button
        onClick={handlePrev}
        disabled={isAnimating}
        className="hidden lg:flex absolute -left-2 xl:left-0 top-1/2 -translate-y-1/2 z-20 bg-white text-gray-800 w-10 h-10 xl:w-12 xl:h-12 rounded-full shadow-xl items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>
      
      <button
        onClick={handleNext}
        disabled={isAnimating}
        className="hidden lg:flex absolute -right-2 xl:right-0 top-1/2 -translate-y-1/2 z-50 bg-white text-gray-800 w-10 h-10 xl:w-12 xl:h-12 rounded-full shadow-xl items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden mx-auto max-w-[1900px]">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-3 sm:gap-4 lg:gap-5"
          style={{ 
            transform: `translateX(${translateX}%)`
          }}
        >
          {data.map((card, index) => (
            <div
              key={`card-${card.id || index}-${card.name}`}
              className="flex-shrink-0"
              style={{ 
                width: slidesPerView === 1 
                  ? '100%' 
                  : `calc(${100 / slidesPerView}% - ${(slidesPerView - 1) * (window.innerWidth >= 1024 ? 1.25 : window.innerWidth >= 640 ? 1 : 0.75) / slidesPerView}rem)`
              }}
            >
              <HeroCard card={card} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {data.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 700);
              }
            }}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 sm:w-8 bg-[#ff3b5c]' 
                : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}