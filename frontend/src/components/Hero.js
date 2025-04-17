import React from "react";
import HeroImgUrl from "../assets/heroImage.png";
import "./Hero.css";

function Hero({ scrollToContact }) {  

  return (
    <section className="heroContainer">
      <div className="heroContent">
        <h1 className="heroTitle">Finding Tech Solutions Together</h1>
        <p className="heroDescription">
          At Evri Tech, we create innovative web development and graphic design solutions tailored to your business. Whether you're a startup or an established business, Evri Tech is here to enhance your digital presence.
        </p>
        <a className="contactBtn" onClick={scrollToContact}>GET A FREE QUOTE</a> {/* Trigger scroll */}
      </div>
      <img src={HeroImgUrl} className="heroImage" />
      <div className="topBlur" />
      <div className="bottomBlur" />
    </section>
  );
}

export default Hero;
