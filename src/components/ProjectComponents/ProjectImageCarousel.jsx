// ProjectImageCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ProjectImageCarousel.css';

const ProjectImageCarousel = ({ images, descriptions }) => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const cardCount = images.length;

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + cardCount) % cardCount);
  };

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % cardCount);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging) return;
    e.preventDefault();
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging) return;
    
    const minSwipeDistance = 50;
    if (touchEnd && touchStart) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getStyleVars = (index) => {
    if (isMobile) {
      // Mobile: simple horizontal sliding
      const offset = (index - active) / 1;
      const direction = Math.sign(index - active);
      const isActive = index === active ? 1 : 0;
      const opacity = Math.abs(active - index) <= 1 ? 1 : 0.3;
      
      return {
        '--offset': offset,
        '--direction': direction,
        '--active': isActive,
        '--opacity': opacity,
        '--drag-offset': isDragging ? dragOffset : 0,
      };
    } else {
      // Desktop: 3D carousel effect
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
    }
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
      <div 
        className={`carousel ${isMobile ? 'mobile-carousel' : ''}`}
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, index) => (
          <div
            className={`card-container ${isMobile ? 'mobile-card' : ''}`}
            key={index}
            style={getStyleVars(index)}
          >
            <div className="card">
              <img src={img} alt={`Slide ${index}`} className="card-img" />
            </div>
          </div>
        ))}
        
        {/* Navigation buttons - hidden on mobile */}
        {!isMobile && (
          <>
            <button className="nav left" onClick={prevSlide}>
              ‹
            </button>
            <button className="nav right" onClick={nextSlide}>
              ›
            </button>
          </>
        )}
      </div>

      {/* Mobile indicators */}
      {isMobile && (
        <div className="mobile-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === active ? 'active' : ''}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}

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
