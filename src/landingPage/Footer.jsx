import React from "react";
import { MapPin, Mail, Instagram, Facebook } from "lucide-react";

const NAVIGATION_SECTIONS = {
  categories: [
    { label: "All Categories", href: "#" },
    { label: "Birthday", href: "#" },
    { label: "Anniversary", href: "#" },
  ],
  gifts: [
    { label: "Rakhi Gifts", href: "#" },
    { label: "More Gifts", href: "#" },
    { label: "Customized", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

const CONTACT_INFO = {
  address: "10 Godha colony pagnispaga palsikar Indore 452001",
  email: "hetalsoapstory@gmail.com",
  phone: "9112233507",
};

const NavigationSection = ({ title, links }) => (
  <div className="lg:col-span-1">
    <h3 className="text-xl font-semibold mb-6">{title}</h3>
    <nav>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const ContactInfoSection = () => (
  <div className="lg:col-span-1">
    <h2 className="text-2xl font-bold mb-4">GiftShop</h2>
    <p className="text-gray-300 mb-6 leading-relaxed">
      Experience the joy of owning a beautifully crafted home with Kavara
      Infrastructure.
    </p>

    {/* Address */}
    <div className="flex items-start gap-3 mb-4">
      <MapPin className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
      <address className="text-gray-300 not-italic">
        {CONTACT_INFO.address}
      </address>
    </div>

    {/* Email */}
    <div className="flex items-center gap-3">
      <Mail className="w-5 h-5 text-gray-300 flex-shrink-0" />
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="text-gray-300 hover:text-white transition-colors duration-300"
      >
        {CONTACT_INFO.email}
      </a>
    </div>
  </div>
);

const ContactUsSection = () => (
  <div className="lg:col-span-1">
    <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
    <a
      href={`tel:${CONTACT_INFO.phone}`}
      className="text-gray-300 hover:text-white transition-colors duration-300"
    >
      {CONTACT_INFO.phone}
    </a>
  </div>
);

const FooterBottom = () => (
  <div className="border-t border-gray-800 pt-6 mt-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-300 text-sm">
        © {new Date().getFullYear()} GiftShop. All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <ContactInfoSection />
          <NavigationSection
            title="Categories"
            links={NAVIGATION_SECTIONS.categories}
          />
          <NavigationSection title="Gifts" links={NAVIGATION_SECTIONS.gifts} />
          <ContactUsSection />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}

export default Footer;
