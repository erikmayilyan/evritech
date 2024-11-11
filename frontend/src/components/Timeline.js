import React from "react";
import { PiNumberCircleOne } from "react-icons/pi";
import { PiNumberCircleTwo } from "react-icons/pi";
import { PiNumberCircleThree } from "react-icons/pi";
import { PiNumberCircleFour } from "react-icons/pi";
import "./About.css";

function Timeline () {
  return (
    <div className="timeline">
      <h1>OUR TIMELINE</h1>
      <div className="container left-container">
        <PiNumberCircleOne className="numIcon" />
        <div className="text-box">
          <h2>Business Idea</h2>
          <small>March 2024</small>
          <p className="textBoxP">The business idea of Evri Tech appeared in March 2024, and negotiations with the team members immediately started regarding the format and functionality of the business.</p>
          <span className="left-container-arrow"></span>
        </div>
      </div>
      <div className="container right-container">
        <PiNumberCircleTwo className="numIcon" />
        <div className="text-box">
          <h2>Preperation</h2>
          <small>May-August 2024</small>
          <p className="textBoxP">Ever since the business idea of Evri Tech appeared in March 2024, the following months were dedicated to thorough preparation. This period included website development, designing our products, marketing consulting, and completing necessary documentation and paperwork.</p>
          <span className="right-container-arrow"></span>
        </div>
      </div>
      <div class="container left-container">
        <PiNumberCircleThree className="numIcon" />
        <div className="text-box">
          <h2>Launch</h2>
          <small>August 2024</small>
          <p className="textBoxP">In August 2024, Evri Tech proudly launched its operations, marking the culmination of months of dedicated preparation and hard work. This milestone event was celebrated with the unveiling of our website, showcasing our range of web development and graphic design services. Our team was eager to start providing top-notch solutions to meet the needs of our valued customers.</p>
          <span className="left-container-arrow"></span>
        </div>
      </div>
      <div class="container right-container">
        <PiNumberCircleFour className="numIcon" />
        <div className="text-box">
          <h2>Ongoing Success</h2>
          <small>Since August 2024</small>
          <p className="textBoxP">Ever since we started our business, Evri Tech has been successfully completing numerous web development and graphic design projects. Our commitment to quality and customer satisfaction has enabled us to build a strong portfolio, helping various businesses enhance their online presence and visual identity. We continue to strive for excellence in every project we undertake.</p>
          <span className="right-container-arrow"></span>
        </div>
      </div>
    </div>
  )
};

export default Timeline;