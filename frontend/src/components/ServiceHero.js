import React from "react";
import ServiceImgUrl from "../assets/services.png";
import "./Hero.css";

function ServiceHero () {
  return (
    <section className="heroContainer">
      <div className="heroContent">
        <h1 className="heroTitle">Services We Offer</h1>
        <p className="heroDescription">We are dedicated to delivering high-quality services tailored to meet the unique needs of our customers. Below, you'll find a comprehensive list of the specialized services we offer, designed to ensure the best results and customer satisfaction!</p>
        <a className="contactBtn" href="/booking">BOOK A CALL NOW</a>
      </div>
      <img src={ServiceImgUrl} className="heroImage" />
      <div className="topBlur" />
      <div className="bottomBlur" />
    </section>
  );
};

export default ServiceHero;