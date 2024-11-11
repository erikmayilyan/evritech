import React, { useEffect, useState } from "react";
import { MdOutlineComputer, MdOutlineDesignServices } from "react-icons/md";
import OfferImgUrl from "../assets/offer.png";
import "./Offer.css";

function Offer () {
  return (
    <section className="offerContainer">
      <h1 className="offerTitle">SERVICES</h1>
      <div className="offerContent">
        <img src={OfferImgUrl} className="offerImage" alt="Offer" />
        <ul className="offerItems">
          <li className="offerItem">
            <MdOutlineComputer className="offerIcon" />
            <div className="offerItemText">
              <h3>Web Development</h3>
              <p>
                Evri Tech offers comprehensive web development services, including website design, development, and maintenance. We create responsive, user-friendly sites tailored to client needs, ensuring optimal performance. Services include portfolio, personal & business websites, e-commerce solutions, CMS, custom web apps, and SEO. We also provide web hosting, domain registration, and ongoing support for seamless operation.
              </p>
            </div>
          </li>
          <li className="offerItem">
            <MdOutlineDesignServices className="offerIcon" />
            <div className="offerItemText">
              <h3>Graphic Design</h3>
              <p>
                Evri Tech offers comprehensive graphic design services, including logo design, branding, marketing materials, infographics, and digital content creation. We craft unique visual identities that boost brand recognition and engagement. We also provide print design services like brochures, business cards, and posters, ensuring cohesive branding across all mediums.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
};

export default Offer;
