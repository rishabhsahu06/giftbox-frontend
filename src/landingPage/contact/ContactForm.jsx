import React, { useState } from "react";
import { raiseQuery } from "../../api/user";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === "textarea" ? "message" : e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await raiseQuery(formData);
      console.log("Query submitted:", response.data);
      alert("Query submitted successfully!");
      setFormData({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Failed to submit query. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Get In Touch!</h2>
      <p className="text-gray-300 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="2"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Details"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
