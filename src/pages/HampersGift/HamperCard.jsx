import React from 'react';
import { useNavigate } from 'react-router-dom';
const HamperCard = ({ hamper }) => {
  // Fallback image if one isn't provided
  const navigate = useNavigate();
  const imageUrl = hamper.image || "https://via.placeholder.com/300";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Image Section */}
      <div className="h-48 w-full overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={hamper.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {hamper.type && (
          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full uppercase">
            {hamper.type}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-2 md:p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 truncate" title={hamper?.name}>
            {hamper?.name}
          </h3>
          <p className="text-sm md:text-lg font-bold text-green-600">
             ₹{hamper?.price}
          </p>
        </div>
        {/* Categories / Tags */}
        <div className="text-sm  text-gray-500 mb-3">
          {hamper.category?.name || "General"}
        </div>

        {/* Product Count Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded border border-blue-100">
            {hamper?.products?.length || 0} Items inside
          </span>
        </div>

        {/* Action Button */}
        <button 
          className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          onClick={() => navigate(`/hamperdetails/${hamper._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HamperCard;