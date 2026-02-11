import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-3 md:p-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: 11th June 2025
        </p>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="font-semibold text-lg mb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>Hetal Soap Story</strong>. By accessing or
              purchasing from our website, you agree to be bound by these Terms
              and Conditions. If you do not agree with any part of these terms,
              please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">2. Eligibility</h2>
            <p>
              You must be at least 12 years old to use this website or have
              permission from a parent or guardian.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              3. Products and Services
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All products are subject to availability.</li>
              <li>
                We reserve the right to modify or discontinue products at any
                time.
              </li>
              <li>
                Product images are for illustration; actual products may vary
                slightly.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              4. Pricing and Payments
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>All prices are listed in INR.</li>
              <li>Prices may change without prior notice.</li>
              <li>
                Payments must be completed through our approved payment
                gateways.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              5. Shipping and Delivery
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Delivery times are estimates and may vary.</li>
              <li>
                We are not responsible for delays caused by courier services or
                unforeseen circumstances.
              </li>
              <li>
                Risk of loss passes to the customer upon successful delivery.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              6. Returns and Refunds
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Returns are accepted only for damaged or incorrect items.
              </li>
              <li>
                Customers must report issues within 48 hours of delivery.
              </li>
              <li>
                Refunds will be processed to the original payment method.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              7. User Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate shipping and contact details.</li>
              <li>Do not misuse the website for unlawful activities.</li>
              <li>Respect intellectual property rights.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              8. Intellectual Property
            </h2>
            <p>
              All content on this website, including images, logos, and text,
              belongs to Hetal Soap Story and may not be copied or used without
              permission.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              Hetal Soap Story is not liable for any indirect or consequential
              damages arising from the use of our website or products.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. Changes
              will be posted on this page with an updated date.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              11. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of India.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">
              12. Contact Information
            </h2>
            <p>
              <strong>Hetal Soap Story</strong>
              <br />
              Email: hetalsoapstory@gmail.com
              <br />
              Phone: 9112233507

              <br />
              Address: 10 Godha colony pagnispaga palsikar Indore 452001
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;