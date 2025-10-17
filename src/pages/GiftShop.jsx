import React from "react";

function GiftShop() {
  const features = [
    {
      title: "Express Shipping",
      icon: (
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          className="text-gray-400 group-hover:text-rose-500 transition-colors duration-300"
        >
          <path
            d="M15 35h45v25H15V35z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M60 45h15l8 10v10H60V45z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="25"
            cy="70"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="70"
            cy="70"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M15 30h8M15 25h12M15 20h6"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      title: "Personalization",
      icon: (
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          className="text-gray-400 group-hover:text-rose-500 transition-colors duration-300"
        >
          <path
            d="M25 45h15v30H25V45z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M40 55l8-8 8 8 8-8 8 8v20H40V55z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M48 35l4-4 4 4 4-4 4 4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="30" cy="35" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Easy Returns & Exchanges",
      icon: (
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          className="text-gray-400 group-hover:text-rose-500 transition-colors duration-300"
        >
          <path
            d="M25 35h40v30H25V35z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M30 30v-5h30v5M35 40h20M35 45h15M35 50h25"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M70 45c8 0 15 7 15 15s-7 15-15 15"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M75 70l-5 5-5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-500 tracking-wide">
            GiftShop
          </h1>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex justify-center">{item.icon}</div>
              <h2 className="text-lg md:text-xl font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GiftShop;
