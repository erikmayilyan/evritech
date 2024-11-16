import React, { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import "./Portfolio.scss";

function Portfolio() {
  const [websites, setWebsites] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [filteredValue, setFilteredValue] = useState(1); // Default to 'All'
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get(`https://www.evritech.ca/api/other/the-websites`);
        setWebsites(response.data);
      } catch (error) {
        console.error('Error fetching websites:', error);
        setError('Unable to load websites');
      }
    };
    const fetchGraphics = async () => {
      try {
        const response = await axios.get(`https://www.evritech.ca/api/other/the-graphic`);
        setGraphics(response.data);
      } catch (error) {
        console.error('Error fetching graphic designs:', error);
        setError('Unable to load graphics');
      }
    };
    fetchWebsites();
    fetchGraphics();
  }, []);

  const filterData = [
    {
      filterId: 1,
      label: 'All'
    },
    {
      filterId: 2,
      label: 'Web Development'
    },
    {
      filterId: 3,
      label: 'Graphic Design'
    }
  ];

  function handleFilter(currentId) {
    setFilteredValue(currentId);
  };

  function handleHover(index) {
    setHoveredValue(index);
  };

  const filteredItems = () => {
    if (filteredValue === 1) {
      return [...websites, ...graphics];
    } else if (filteredValue === 2) {
      return websites;
    } else if (filteredValue === 3) {
      return graphics;
    }
    return [];
  };

  return (
    <div>
      <NavBar />
      <section className='portfolio-main'>
        <div className='portfolio-contents'>
          <h1 className='portfolio-title'>Portfolio</h1>
          <ul className='portfolio-contents-filter'>
            {filterData.map((item) => (
              <li
                onClick={() => handleFilter(item.filterId)}
                key={item.filterId}
                className={filteredValue === item.filterId ? 'active-filter' : ''}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className='portfolio-contents-cards'>
            {filteredItems().map((item, index) => (
              <div
                className='portfolio-contents-cards-item'
                key={`cardItem${item.name?.trim() || item.title?.trim()}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(null)}
              >
                <div className='portfolio-contents-cards-item-images'>
                  <a>
                    <img
                      alt={item.title || item.name}
                      src={`https://www.evritech.ca/${item.image}`}
                    />
                  </a>
                </div>
                <div className="overlay-two">
                  {index === hoveredValue && (
                    <div>
                      <h1 className="overlay-Title">{item.title || item.name}</h1>
                      {item.urlTitle && item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="portfolio-button">
                          {item.urlTitle}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {error && <p className='error-message'>{error}</p>}
      </section>
      <Footer />
    </div>
  );
};

export default Portfolio;
