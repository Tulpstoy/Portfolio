// MobileCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import './MobileCarousel.css';

const MobileCarousel = ({ images, descriptions }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalDescription, setModalDescription] = useState('');
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
        <div className="mobile-carousel" ref={carouselRef}>
          <ul className="mobile-carousel__list">
            {images.map((image, index) => {
              const position = getPosition(index);
              return (
                <li 
                  key={index}
                  className="mobile-carousel__item"
                  data-pos={position}
                  onClick={() => setActiveIndex(index)}
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
        </div>

        {/* Mobile indicators */}
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

        {/* Description Box */}
        <div className="mobile-card-description-outer">
          <div className="mobile-card-description-inner">
            <p className="mobile-card-description">{descriptions[activeIndex]}</p>
          </div>
        </div>
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