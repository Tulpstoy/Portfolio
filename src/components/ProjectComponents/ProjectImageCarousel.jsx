// ProjectImageCarousel.jsx
import React, { useState, useEffect } from 'react';
import './ProjectImageCarousel.css';

const ProjectImageCarousel = ({ images, descriptions }) => {
  const [active, setActive] = useState(1);
  const cardCount = images.length;

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + cardCount) % cardCount);
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % cardCount);
  };

  const getStyleVars = (index) => {
    const offset = ((active - index) % cardCount) / 3;
    const direction = Math.sign(active - index);
    const absOffset = Math.abs(active - index) / 3;
    const isActive = index === active ? 1 : 0;
    const opacity = Math.abs(active - index) <= 1 ? 1 : 0;

    return {
      '--offset': offset,
      '--direction': direction,
      '--abs-offset': absOffset,
      '--active': isActive,
      '--opacity': opacity,
    };
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel">
        {images.map((img, index) => (
          <div
            className="card-container"
            key={index}
            style={getStyleVars(index)}
          >
            <div className="card">
              <img src={img} alt={`Slide ${index}`} className="card-img" />
            </div>
          </div>
        ))}
        <button className="nav left" onClick={prevSlide}>
          ‹
        </button>
        <button className="nav right" onClick={nextSlide}>
          ›
        </button>
      </div>

      {/* Description Box */}
      <div className="card-description-outer">
        <div className="card-description-inner">
          <p className="card-description">{descriptions[active]}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectImageCarousel;
