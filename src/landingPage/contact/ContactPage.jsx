import React from "react";
import PagesHeader from "../../Component/UI/PagesHeader";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import LocationMap from "./LocationMap";
import SocialMedia from "./SocialMedia";


const ContactPage = () => {
  return (
    <>
      <PagesHeader />
      <ContactInfo />

      <section className="container mx-auto sm:px-12  px-4 py-8 grid md:grid-cols-2 gap-10">
        <ContactForm />
        <LocationMap />
      </section>

     
    </>
  );
};

export default ContactPage;
