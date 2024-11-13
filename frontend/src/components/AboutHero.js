import React from "react";
import AboutImgUrl from "../assets/about.png";
import "./Hero.css";

function AboutHero () {
  return (
    <section className="heroContainer">
      <div className="heroContent">
        <h1 className="heroTitle">About Our Company</h1>
        <p className="heroDescription">EVRI TECH started its operations on August 12, 2024, and since then, its priority has been to satisfy the needs of its customers by providing quality web development and graphic design solutions. To understand more about us, please read the timeline below.</p>
        <a className="contactBtn" href="/booking">BOOK A CALL NOW</a>
      </div>
      <img src={AboutImgUrl} className="heroImage" />
      <div className="topBlur" />
      <div className="bottomBlur" />
    </section>
  );
};

export default AboutHero;