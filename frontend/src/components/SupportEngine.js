import React, { useRef, useEffect, useState } from "react";
import Chat from "./Chat";
import "./SupportEngine.css";

function SupportEngine() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div ref={ref} className="supportEngineContainer">
      {visible && (
        <div className="chatContainer">
          <Chat />
        </div>
      )}
      <div className="supportEngineSection">
        <div
          className={`chatWithMeButton transition-3 ${visible ? 'closeButton' : ''}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
        >
          {visible ? '✖' : '💬'}
        </div>
      </div>
    </div>
  );
}

export default SupportEngine;
