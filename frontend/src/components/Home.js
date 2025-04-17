import React, { useRef } from "react";
import NavBar from './NavBar';
import Hero from './Hero';
import Offer from './Offer';
import Tools from './Tools';
import Work from './Work';
import Contact from "./Contact";
import Prices from './Prices';
import Footer from "./Footer";
import SupportEngine from "./SupportEngine";

function Home() {
  const contactSectionRef = useRef(null);  

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <NavBar />
      <Hero scrollToContact={scrollToContact} /> 
      <Offer />
      <Tools />
      <Work />
      <Prices />
      <SupportEngine />
      <Contact ref={contactSectionRef} />  
      <Footer />
    </div>
  );
}

export default Home;
