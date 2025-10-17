import React from 'react';
import { FaRegFaceSmileBeam, FaSquareInstagram, FaTruck, FaTwitter } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdOutlineCurrencyExchange } from 'react-icons/md';

const Footer2 = () => {
const payments = [
  { label: 'PhonePe', color: 'bg-purple-600 text-white' },
  { label: 'Google Pay', color: 'bg-green-600 text-white' },
  { label: 'Paytm', color: 'bg-blue-500 text-white' },
  { label: 'BHIM UPI', color: 'bg-indigo-600 text-white' },
  { label: 'VISA', color: 'bg-blue-600 text-white' },
  { label: 'Mastercard', color: 'bg-gradient-to-r from-red-500 to-orange-500 text-white' },
  { label: 'AMERICAN EXPRESS', color: 'bg-blue-500 text-white' },
  { label: 'RuPay', color: 'bg-green-600 text-white' },
  { label: 'Razorpay', color: 'bg-red-500 text-white' },
];


  const verified = [
    { label: 'Norton', color: 'bg-red-600 text-white' },
    { label: 'VERIFIED by Visa', color: 'bg-blue-600 text-white' },
    { label: 'MasterCard', color: 'bg-yellow-500 text-black' },
    { label: 'PCI DSS', color: 'bg-green-700 text-white' },
  ];

  const social = [
    { icon: <FaTwitter />, bg: 'bg-blue-400 hover:bg-blue-500' },
    { icon: <FaSquareInstagram />, bg: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:opacity-90' },
  ];

  const features = [
    { icon: <MdOutlineCurrencyExchange />, title: 'EASY EXCHANGE' },
    { icon: <GiReceiveMoney />, title: 'SECURE PAYMENTS' },
    { icon: <FaTruck />, title: 'EXPRESS PICKUP' },
    { icon: <FaRegFaceSmileBeam />, title: 'AUTHENTIC PRODUCTS' },
  ];

  return (
    <div className="bg-gray-100 py-12 px-4 border-t-1 border-gray-400">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Pay Securely */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-xl tracking-wide">PAY SECURELY BY</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {payments.map((p) => (
                <div key={p.label} className={`${p.color} px-3 py-1 rounded text-xs font-bold`}>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Reach Out */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-xl tracking-wide">REACH OUT TO US</h3>
            <p className="text-gray-600 text-sm mb-2">For any queries, please write to us:</p>
            <a href="mailto:customercare@shoppersstop.com" className="text-blue-600 underline text-sm">
              customercare@shoppersstop.com
            </a>
          </div>

          {/* Verified */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-xl tracking-wide">VERIFIED BY</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {verified.map((v) => (
                <div key={v.label} className={`${v.color} px-2 py-1 rounded text-xs font-bold`}>
                  {v.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="flex items-center justify-center gap-6 mb-12 md:border border-gray-300 py-5">
          <h3 className="font-semibold text-gray-900 text-xl tracking-wide">FOLLOW US ON</h3>
          <div className="flex gap-4">
            {social.map((s, idx) => (
              <div
                key={idx}
                className={`${s.bg} w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors`}
              >
                <span className="text-white text-xl">{s.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center px-2">
              <div className="w-15 h-15 bg-gray-200 border border-gray-800 rounded-full flex items-center justify-center mb-2 text-[#EA8A0F] text-xl">
                {f.icon}
              </div>
              <h4 className="font-semibold text-gray-800 text-sm">{f.title}</h4>
              {f.subtitle && <p className="text-gray-600 text-xs">{f.subtitle}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer2;
