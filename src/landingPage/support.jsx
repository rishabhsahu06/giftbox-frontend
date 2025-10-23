import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock, Send, HelpCircle, FileText, Zap } from 'lucide-react';

const Supportpage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const supportOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "hetalsoapstory@gmail.com",
      action: "Send Email",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "9112233507",
      action: "Call Now",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const faqs = [
    { question: "How do I reset my password?", answer: "Click on 'Forgot Password' on the login page and follow the instructions." },
    { question: "What are your business hours?", answer: "We're available 24/7 to assist you with any questions or concerns." },
    { question: "How can I track my order?", answer: "Log into your account and visit the 'Orders' section to track your shipment." },
    { question: "Do you offer refunds?", answer: "Yes, we offer a 30-day money-back guarantee on all purchases." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full mb-6 shadow-lg">
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Available 24/7</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our dedicated support team is here around the clock to assist you with any questions or concerns
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-black transition-all duration-300 hover:transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${option.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button className="text-black font-medium group-hover:text-gray-700 transition-colors flex items-center gap-2">
                {option.action}
                <Zap className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
            <h2 className="text-3xl font-bold text-black mb-6">Send Us a Message</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {submitted && (
                <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg font-medium">
                  Thank you! We'll get back to you within 24 hours.
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg mb-6">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-black" />
                <h2 className="text-3xl font-bold text-black">Quick Answers</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="cursor-pointer list-none flex items-start gap-3 text-gray-700 hover:text-black transition-colors py-3 border-b-2 border-gray-200 font-medium">
                      <span className="text-black group-open:rotate-90 transition-transform">▶</span>
                      <span>{faq.question}</span>
                    </summary>
                    <p className="text-gray-600 mt-3 ml-6 pb-3">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-2 border-gray-300 shadow-lg">
              <FileText className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">Need More Help?</h3>
              <p className="text-gray-700 mb-4">
                Check out our comprehensive documentation and knowledge base for detailed guides and tutorials.
              </p>
              <button className="bg-black text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* 24/7 Banner */}
        <div className="bg-black text-white rounded-2xl p-8 text-center shadow-2xl">
          <Clock className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">We're Always Here for You</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Our support team works around the clock to ensure you get the help you need, whenever you need it. 
            No question is too small, and no issue is too complex.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Supportpage;