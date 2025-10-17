import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import img from "../../assets/contactimg.jpg";

const ContactInfo = () => {
  const info = [
    { icon: <Phone />, text: "+(654) 6544 55" },
    { icon: <Mail />, text: "mail@kitchin.com" },
    { icon: <MapPin />, text: "London Eye, UK" },
  ];

  return (
    <section className="container w-full mx-auto sm:px-[4rem] px-[1rem] sm:py-10 py-4 grid md:grid-cols-2 gap-10 items-center relative">
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Contact Information
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Get in touch with our team for any questions, support, or
          collaboration opportunities. We are committed to providing prompt
          assistance and making your experience seamless.
        </p>

        <div className="space-y-4">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-800 text-base md:text-lg"
            >
              <span className="text-yellow-500">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden absolute md:flex justify-end right-[4rem] top-[-8rem]">
        <img 
          src={img}
          alt="Contact"
          className="z-20 rounded-lg border rounded-t-full shadow-lg w-[18rem] h-[27rem] object-cover"
        />
      </div>
    </section>
  );
};

export default ContactInfo;
