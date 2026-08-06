// MobileCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import ThoughtBubble from './ThoughtBubble';
import './MobileCarousel.css';

const MobileCarousel = ({ images, descriptions }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalDescription, setModalDescription] = useState('');
  const [touchStart, setTouchStart] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const carouselRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(null);
  };

  const handleMouseMove = (e) => {
    if (isMobile || !carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  const getPosition = (index) => {
    const diff = index - activeIndex;
    const length = images.length;
    
    // Handle wrapping around
    if (Math.abs(diff) > length / 2) {
      if (diff > 0) {
        return diff - length;
      } else {
        return diff + length;
      }
    }
    
    return diff;
  };

  const openModal = (image, description) => {
    setModalImage(image);
    setModalDescription(description);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    setModalDescription('');
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <>
      <div className="mobile-carousel-wrapper">
        <div
          className="mobile-carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => !isMobile && setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setHoveredIndex(null); }}
        >
          {/* Left/right arrows - hidden on the smallest screens where swipe takes over */}
          <button
            type="button"
            className="mobile-carousel__nav mobile-carousel__nav--left"
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            type="button"
            className="mobile-carousel__nav mobile-carousel__nav--right"
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <ul className="mobile-carousel__list">
            {images.map((image, index) => {
              const position = getPosition(index);
              return (
                <li
                  key={index}
                  className="mobile-carousel__item"
                  data-pos={position}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`Mobile Screenshot ${index + 1}`} 
                    className="mobile-carousel__image"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(image, descriptions[index]);
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {!isMobile && (
            <ThoughtBubble
              text={descriptions[hoveredIndex !== null ? hoveredIndex : activeIndex]}
              containerRef={carouselRef}
              mouseX={mouseX}
              mouseY={mouseY}
              isHovering={isHovering}
            />
          )}
        </div>

        {/* Dot indicators */}
        {isMobile && (
          <div className="mobile-carousel__indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`mobile-carousel__indicator ${index === activeIndex ? 'mobile-carousel__indicator--active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Static caption on mobile - no hover to trigger the desktop bubble */}
        {isMobile && (
          <div className="mobile-caption">
            <div className="thought-bubble">
              <p className="thought-bubble__text">{descriptions[activeIndex]}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="mobile-carousel-modal-overlay" onClick={closeModal}>
          <div className="mobile-carousel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mobile-carousel-modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="mobile-carousel-modal-image-container">
              <img 
                src={modalImage} 
                alt="Full Mobile Screenshot" 
                className="mobile-carousel-modal-image"
              />
            </div>
            <div className="mobile-carousel-modal-description">
              <p>{modalDescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileCarousel; 