import React from "react";
import { Gift, Heart, Sparkles, Home } from "lucide-react";

const occasions = [
  {
    id: "birthday",
    title: "Birthday",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=1000&fit=crop&fm=webp&q=80",
    href: "/occasions/birthday",
    icon: Gift,
    width: 800,
    height: 1000,
  },
  {
    id: "wedding",
    title: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&fm=webp&q=80",
    href: "/occasions/wedding",
    icon: Heart,
    width: 800,
    height: 600,
  },
  {
    id: "home-decor",
    title: "Home Decor",
    image: "https://images.unsplash.com/photo-1615874694520-474822394e73?w=800&h=600&fit=crop&fm=webp&q=80",
    href: "/occasions/home-decor",
    icon: Home,
    width: 800,
    height: 600,
  },
  {
    id: "anniversary",
    title: "Anniversary",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1000&fit=crop&fm=webp&q=80",
    href: "/occasions/anniversary",
    icon: Sparkles,
    width: 800,
    height: 1000,
  },
];

export default function OccasionGift({ onViewAll, onOccasionClick }) {
  const handleOccasionClick = (occasion) => {
    if (onOccasionClick) onOccasionClick(occasion);
  };

  const handleViewAll = () => {
    if (onViewAll) onViewAll();
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
            Gifts by Occasion
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover the perfect gift for every special moment
          </p>
        </div>

        {/* Desktop Layout - 3 Column Asymmetric Grid */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 mb-12">
          {/* Left Column - Birthday */}
          <div className="col-span-4">
            <button
              onClick={() => handleOccasionClick(occasions[0])}
              className="group block w-full text-left"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] h-[620px]">
                <img
                  src={occasions[0].image}
                  alt={occasions[0].title}
                  width={occasions[0].width}
                  height={occasions[0].height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2">
                    {occasions[0].title}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    Celebrate special moments →
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Middle Column - Wedding & Home Decor */}
          <div className="col-span-4 flex flex-col gap-6">
            {[occasions[1], occasions[2]].map((occasion) => {
              const IconComponent = occasion.icon;
              return (
                <button
                  key={occasion.id}
                  onClick={() => handleOccasionClick(occasion)}
                  className="group block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] h-[300px]">
                    <img
                      src={occasion.image}
                      alt={occasion.title}
                      width={occasion.width}
                      height={occasion.height}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-1">
                        {occasion.title}
                      </h3>
                      <p className="text-white/90 text-xs font-medium">
                        {occasion.id === "wedding" ? "Perfect union gifts →" : "Transform spaces →"}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column - Anniversary */}
          <div className="col-span-4">
            <button
              onClick={() => handleOccasionClick(occasions[3])}
              className="group block w-full text-left"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] h-[620px]">
                <img
                  src={occasions[3].image}
                  alt={occasions[3].title}
                  width={occasions[3].width}
                  height={occasions[3].height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2">
                    {occasions[3].title}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    Cherish memories →
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Tablet & Mobile layouts stay same but lazy-load */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {occasions.map((occasion) => {
            const IconComponent = occasion.icon;
            return (
              <button
                key={occasion.id}
                onClick={() => handleOccasionClick(occasion)}
                className="group block w-full text-left"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] h-[280px] sm:h-[320px]">
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    width={occasion.width}
                    height={occasion.height}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/20 backdrop-blur-sm p-2.5 sm:p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg mb-1">
                      {occasion.title}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm font-medium">
                      Explore collection →
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid md:hidden grid-cols-1 gap-4 mb-8">
          {occasions.map((occasion) => {
            const IconComponent = occasion.icon;
            return (
              <button
                key={occasion.id}
                onClick={() => handleOccasionClick(occasion)}
                className="group block w-full text-left"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg active:shadow-2xl transition-all duration-300 active:scale-[0.98] h-[220px] xs:h-[260px]">
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    width={occasion.width}
                    height={occasion.height}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2.5 rounded-full">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl xs:text-2xl font-bold text-white drop-shadow-lg mb-1">
                      {occasion.title}
                    </h3>
                    <p className="text-white/90 text-xs font-medium">
                      Tap to explore →
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAll}
            className="bg-red-400 hover:bg-red-600 active:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-xl font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            VIEW ALL 
          </button> 
        </div>
      </div>
    </div>
  );
}
