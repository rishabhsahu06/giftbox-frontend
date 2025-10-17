import React from "react";

const LocationMap = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Our Location</h2>
      <p className="text-gray-600 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis.
      </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19802.22238788353!2d-0.12462644608808924!3d51.5007320796359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b90052eeb7%3A0x1e91c7b5e2ad6539!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1636891412424!5m2!1sen!2suk"
        width="100%"
        height="300"
        allowFullScreen=""
        loading="lazy"
        className="rounded-lg shadow-md"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default LocationMap;
