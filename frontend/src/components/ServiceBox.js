import React from "react";
import "./Services.css";

function ServiceBox (props) {
  return (
    <div className="a-box">
      <div className="a-b-icon">
        {props.icon}
      </div>
      <div className="a-b-text">
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
    </div>
  )
};

export default ServiceBox;