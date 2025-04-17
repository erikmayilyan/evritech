import React from "react";
import NavBar from "./NavBar";
import AboutHero from "./AboutHero";
import Timeline from "./Timeline";
import Footer from "./Footer";
import "./About.css";

function About () {
  return (
    <div>
      <NavBar />
      <AboutHero />
      <Timeline />
      <Footer />
    </div>
  )
};

export default About;