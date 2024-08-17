import React, { useState, useEffect } from 'react';
import WhatsAppButton from 'react-whatsapp';
import "./chatbot.css";

const Chatbot = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
       <div className={scrolled ? "btn btn-lg btn-lg-square back-to-top scroll whatsapp" : "btn btn-lg-square"}>
      <WhatsAppButton number="3160976631" message="Hello, I would like to inquire about the hotel room availability." className="my-whatsapp-button">
      <img src="/img/WhatsApp-Logo.svg"  alt="WhatsApp" className="whatsapp-icon"/>     
      </WhatsAppButton>
    </div>
    </>
  );
};

export default Chatbot;
