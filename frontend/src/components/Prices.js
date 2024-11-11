import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "./Prices.css";

function Prices () {
  return (
    <section className="pricesSection">
      <div className="pricesContent">
        <h1 className="pricesTitle">PRICING</h1>
        <p className="pricesPar">Choose the packages for the WEB DEVELOPMENT (All prices are in US dollars)</p>
      </div>
      <div className="pricesCards">
        <div className="pricesCard">
          <h2>BASIC</h2>
          <p>Good for Start-Ups and Small Businesses</p>
          <p className="startingFrom">Starting From:</p>
          <div className="pricesCardText">
            <span className="oldPrice">$300</span>
            <span className="newPrice">$249</span>
          </div>
          <ul>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Up To 4 Pages
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Frontend Development
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Mobile Responsiveness
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Contact Form
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Social Media <br /> Integration
            </li>
          </ul>
        </div>
        <div className="pricesCard">
          <h2>STANDARD</h2>
          <p>Good for Medium-Sized Businesses</p>
          <p className="startingFrom">Starting From:</p>
          <div className="pricesCardText">
            <span className="oldPrice">$650</span>
            <span className="newPrice">$599</span>
          </div>
          <ul>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Up to 12 Pages
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Frontend & Backend <br /> Development
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Social Media <br /> Integration
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Basic CMS (Content <br /> Management System) <br /> Admin Page
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Mobile Responsiveness
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Blog Setup & <br /> Configuration
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Contact Forms 
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Appointment Booking <br /> (+$100)
            </li>
          </ul>
        </div>
        <div className="pricesCard">
          <h2>PREMIUM</h2>
          <p>Good for E-Commerce and Large Businesses</p>
          <p className="startingFrom">Starting From:</p>
          <div className="pricesCardText">
            <span className="oldPrice">$1500</span>
            <span className="newPrice">$1349</span>
          </div>
          <ul>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Unlimited Pages
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Frontend & Backend <br /> Development
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Social Media <br /> Integration
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  E-Commerce <br /> Functionality
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  User Registration
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Customer Portals
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Advanced CMS (Content <br /> Management System) <br />
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Mobile Responsiveness
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Blog Setup & <br /> Configuration
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Contact Forms 
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Appointment Booking <br /> (+$100)
            </li>
          </ul>
        </div>
      </div>
      <div className="pricesContent">
        <p className="pricesPar">Choose the packages for the GRAPHIC DESIGN (All prices are in US dollars)</p>
        <p>Every Category is Available for Purchase On It's Own</p>
      </div>
      <div className="pricesCards">
        <div className="pricesCard">
          <h2>BASIC</h2>
          <p>Good for Start-Ups and Small Businesses</p>
          <p className="startingFrom">Starting From:</p>
          <div className="pricesCardText">
            <span className="oldPrice">$210</span>
            <span className="newPrice">$190</span>
          </div>
          <ul>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Basic Logo Design <br /> ($80-$180)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Business Card <br /> (One Page) ($40-$100)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Social Media <br /> Graphic (2 Pages) <br /> ($40-$80)
            </li>
          </ul>
        </div>
        <div className="pricesCard">
          <h2>STANDARD</h2>
          <p>Good for Medium-Sized Businesses</p>
          <p className="startingFrom">Starting From:</p>
          <div className="pricesCardText">
            <span className="oldPrice">$460</span>
            <span className="newPrice">$399</span>
          </div>
          <ul>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Standard Logo Design <br /> ($180-$380)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Business Card <br /> (Two Pages) ($80-$200)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Bi-fold Brochure <br /> (4 Pages) ($150-$250)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Social Media <br /> Graphic (5 Pages) <br /> ($50-$150)
            </li>
          </ul>
        </div>
        <div className="pricesCard">
          <h2>PREMIUM</h2>
          <p>Good for E-Commerce and Large Businesses</p>
          <p className="startingFrom">Starting From:</p>
          <div className="pricesCardText">
            <span className="oldPrice">$1250</span>
            <span className="newPrice">$1149</span>
          </div>
          <ul>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Premium Logo Design <br /> & Branding Package <br /> ($400-$1200)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Tri-Fold Brochure <br /> (6 Pages) ($200-$500) 
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Basic Website Package <br /> ($250-$500)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Details Packaging Design <br /> ($200-$600)
            </li>
            <li>
              <IoIosCheckmarkCircleOutline className="theCheckIcon" />  Social Media Pack <br /> (10 Graphics) <br /> ($200-$350)
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default Prices;