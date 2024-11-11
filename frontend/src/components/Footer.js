import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import Logo from "../assets/evri-white.png";
import "./Footer.css";

function Footer () {
  return (
    <div>
      <div className="footer">
        <div className="top">
          <div>
            <h1 className="footerTitle">
              <img src={Logo} className="evriLogo" alt="Evri Logo" />
            </h1>
            <p className="footerP">Finding Tech Solutions Together</p>
          </div>
          <div className="middle">
            <a href="/">HOME</a>
            <a href="/about">ABOUT</a>
            <a href="/services">SERVICES</a>
            <a href="/portfolio">OUR WORK</a>
            <a href="/booking">BOOK NOW</a>
          </div>
          <div>
            <a href="https://www.instagram.com/evri.tech/">
              <FaInstagram className="dicon" />
            </a>
            <a href="https://www.linkedin.com/company/evri-tech">
              <CiLinkedin className="dicon" />
            </a>
          </div>
        </div>
        </div>
      <div className="theLower">
        <a className="otherLower" href="/termsConditions">TERMS & CONDITIONS</a>
        <a className="otherLower"> | </a>
        <a className="otherLower" href="/privacyPolicy">PRIVACY POLICY</a>
      </div>
    </div>
  )
};

export default Footer;