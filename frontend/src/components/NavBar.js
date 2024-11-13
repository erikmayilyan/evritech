import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/evri-logo.png";
import "./NavBar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <a className="title" href="/">
        <img src={Logo} className="evriLogo" alt="Evri Tech Logo" />
      </a>
      <div className="hamburger" onClick={() => { setMenuOpen(!menuOpen); }}>
        {menuOpen ? (
          <FaTimes className="icon" />
        ) : (
          <FaBars className="icon" />
        )}
      </div>
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <ul className="menuItems">
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/about">ABOUT</a>
          </li>
          <li>
            <a href="/services">SERVICES</a>
          </li>
          <li>
            <a href="/portfolio">OUR WORK</a>
          </li>
          <li>
            <a href="/booking">BOOK NOW</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
