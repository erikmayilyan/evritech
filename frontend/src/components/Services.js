import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import ServiceHero from "./ServiceHero";
import ServiceBox from './ServiceBox';
import { MdComputer } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { TbArrowBarBoth } from "react-icons/tb";
import './Services.css';

function Services() {
  return (
    <div>
      <NavBar />
      <ServiceHero />
      <section className="services">
        <h1>SERVICES</h1>
        <div className="a-container">
          <ServiceBox icon={<MdComputer />} title="Web Development" desc="Web Development involves building and maintaining functional, user-friendly websites." />
          <ServiceBox icon={<MdDesignServices />} title="Graphic Design" desc="Graphic design is the art of creating visual content to communicate messages effectively." />
          <ServiceBox icon={<TbArrowBarBoth />} title="Web Development & Graphic Design" desc="Web development builds and maintains functional websites, while graphic design creates visual content for effective communication." />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Services
