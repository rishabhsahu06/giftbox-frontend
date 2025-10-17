import React, { useState } from 'react';
import { Gift, Truck, CreditCard, Headphones, ChevronDown } from 'lucide-react';
import image from '../assets/about.png';
const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express delivery options are available for 1-2 day shipping to most locations."
    },
    {
      question: "Can I send a gift directly to someone else?",
      answer: "Yes! You can ship directly to any address. We'll include your personalized message and keep pricing information private."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "All our gifts come beautifully wrapped at no extra cost. Premium gift wrapping options are also available during checkout."
    },
    {
      question: "Can I personalize my gift?",
      answer: "Absolutely! Many items can be personalized with names, messages, or special dates. Look for the personalization option on product pages."
    },
    {
      question: "What if my order arrives damaged or incorrect?",
      answer: "We're committed to your satisfaction. Contact us within 48 hours of delivery and we'll arrange a replacement or full refund immediately."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping times and costs vary by destination."
    },
    {
      question: "Can I cancel or change my order after placing it?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After that, items enter our fulfillment process. Contact support for assistance."
    },
    {
      question: "How can I contact customer support?",
      answer: "Our support team is available 24/7 via email, phone, or live chat. We typically respond within 1 hour during business hours."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* About Us Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            We believe that every gift tells a story — if it says joy, celebration, or simply making someone happy just to see, what that makes them happy, we are your partner in making someone's day brighter.
          </p>
          <p>
            Founded with a passion for meaningful gifting, our online shopping platform is built on the idea to connect people with the best gift ideas. We take the stress out of finding perfect gifts, whether it's an anniversary, birthdays, or just because.
          </p>
          <p>
            Whether you're celebrating a big milestone or a small win, we offer a hand-picked collection of thoughtfully curated, personalized happiness-filled gift options, for everyone you cherish and friends to deepen your connections and create lasting memories.
          </p>
        </div>
      </div>

      {/* Gift Boxes Display */}
      <div className="w-full flex p-2 items-center justify-center">
         <img src={image} alt="" />
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 - Curated with Care */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Curated with Care</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We don't just sell gifts — we help you tell stories. Each item in our collection is thoughtfully chosen to bring joy and create meaningful connections. Whether it's a milestone celebration or a simple gesture to show you care, our curated selection ensures every gift resonates with thoughtfulness. We believe gifting is an art, and we're here to make it effortless for you.
            </p>
          </div>

          {/* Card 2 - Personalized Experience */}
          <div className="bg-pink-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Experience</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every gift tells a story, and so do your choices. We're here to help you discover the perfect gift by understanding your preferences and the unique personality of your loved ones. With personalized recommendations and easy customization options, we make your gifting experience seamless and special. Let us help you celebrate life's special moments.
            </p>
          </div>

          {/* Card 3 - Hassle-Free Delivery */}
          <div className="bg-orange-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border-2 border-orange-200">
            <div className="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Hassle-Free Delivery</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sit back and relax — we've got your gift covered from start to finish. From secure packaging to on-time delivery, we ensure your presents arrive in perfect condition, ready to bring smiles. Whether you're sending love across town or across the country, our reliable delivery network makes sure your thoughtful gesture reaches its destination exactly when you need it to.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-b from-white to-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Frequently Asked Question</h2>
          <p className="text-center text-gray-600 mb-12">
            Got questions? We've got answers. From questions on flexibility and pain care to shipping details and customization options, find everything you need to know to make your shopping experience stress-free and informed.
          </p>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 text-left">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;