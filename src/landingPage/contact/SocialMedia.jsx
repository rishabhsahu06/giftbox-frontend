import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const SocialMedia = () => {
  const socials = [Facebook, Twitter, Instagram, Linkedin];

  return (
    <div className="flex gap-4 mt-6">
      {socials.map((Icon, index) => (
        <a
          key={index}
          href="#"
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full"
        >
          <Icon className="w-5 h-5 text-gray-700" />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
