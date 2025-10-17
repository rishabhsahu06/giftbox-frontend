import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1615874694520-474822394e73?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1560448204-8f39f7a0b0f0?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
];

export default function AutoSlider() {
  return (
    <div className="w-full overflow-hidden py-6 bg-gray-50">
      <motion.div
        className="flex gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {/* Duplicate images for smooth infinite scroll */}
        {[...images, ...images].map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 h-30 md:w-74 md:h-50 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
