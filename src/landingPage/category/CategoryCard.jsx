import React from "react";

const CategoryCard = ({ image, brands, offer, bgColor, bgDark }) => {
  return (
    <div className="relative w-[17rem] sm:w-[12rem] md:w-[14rem] lg:w-[16rem] flex-shrink-0 cursor-pointer mx-auto">
      <div className="w-[4.5rem] h-[0.6rem] rounded-t-xl mx-auto" style={{ backgroundColor: bgDark }} />
      <div className="absolute top-0 right-0 w-[5.8rem] h-[1.5rem] rounded-t-xl mx-auto" style={{ backgroundColor: bgColor }} />
      <div className="relative rounded-xl pb-3 shadow-md" style={{ backgroundColor: bgColor }}>
        <div className="p-3">
          <div className="overflow-hidden rounded-t-xl">
            <img
              src={image}
              alt="category"
              className="w-full h-[9rem] sm:h-[11rem] md:h-[12rem] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mt-[1rem] font-semibold">{brands}</div>
            <p className="text-[1.1rem] font-bold">{offer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
