// ProjectImageCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import ThoughtBubble from './ThoughtBubble';
import './ProjectImageCarousel.css';

const ProjectImageCarousel = ({ images, descriptions }) => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalDescription, setModalDescription] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const carouselRef = useRef(null);
  const cardCount = images.length;

  const handleMouseMove = (e) => {
    if (isMobile || !carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);

    // The carousel container's own box is wider than the visible cards (to
    // make room for the peek layout), so moving over blank space inside it
    // never fires a mouseleave on the card itself. Actively check what's
    // under the cursor and clear the hover state if it's not a card.
    if (!e.target.closest('.card-container')) {
      setHoveredIndex(null);
    }
  };

  const openModal = (image, description) => {
    setModalImage(image);
    setModalDescription(description);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    setModalDescription('');
    document.body.style.overflow = 'auto';
  };

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

  const handleTouchEnd = (e) => {
    if (!isMobile || !isDragging) return;

    const minSwipeDistance = 50;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStart - touchEndX;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
  };

  // Position offset from active (like MobileCarousel): -2, -1, 0, 1, 2 with wrapping
  const getPosition = (index) => {
    let diff = index - active;
    if (Math.abs(diff) > cardCount / 2) {
      diff += diff > 0 ? -cardCount : cardCount;
    }
    return diff;
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
    }

    // Desktop: pos -1/0/1 are handled entirely by CSS (data-pos selectors) for
    // the crisp 3-card peek. Anything further out gets an inline transform
    // that parks it off-screen, so sliding into/out of the peek animates from
    // off-screen instead of popping in from the center.
    const pos = getPosition(index);
    if (Math.abs(pos) >= 2) {
      const direction = Math.sign(pos);
      return {
        transform: `translateX(${direction * 160}%) scale(0.65)`,
        opacity: 0,
      };
    }
    return {};
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  return (
    <>
      <div className="carousel-wrapper">
        <div
          className={`carousel ${isMobile ? 'carousel--mobile' : ''}`}
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {images.map((img, index) => (
            <div
              className={`card-container ${isMobile ? 'mobile-card' : ''}`}
              key={index}
              style={getStyleVars(index)}
              data-pos={isMobile ? undefined : getPosition(index)}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex((prev) => (prev === index ? null : prev))}
            >
              <div className="card">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="card-img"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(img, descriptions[index]);
                  }}
                />
              </div>
            </div>
          ))}

          {/* Navigation buttons - hidden on mobile */}
          {!isMobile && (
            <>
              <button className="nav left" onClick={prevSlide} aria-label="Previous slide">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="nav right" onClick={nextSlide} aria-label="Next slide">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </>
          )}

          {!isMobile && (
            <ThoughtBubble
              text={descriptions[hoveredIndex !== null ? hoveredIndex : active]}
              containerRef={carouselRef}
              mouseX={mouseX}
              mouseY={mouseY}
              isHovering={hoveredIndex !== null}
            />
          )}
        </div>

        {/* Dot indicators - shown in both mobile and desktop views */}
        <div className="mobile-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === active ? 'active' : ''}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>

        {/* Static caption on mobile - no hover to trigger the desktop bubble */}
        {isMobile && (
          <div className="mobile-caption">
            <div className="thought-bubble">
              <p className="thought-bubble__text">{descriptions[active]}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="image-carousel-modal-overlay" onClick={closeModal}>
          <div className="image-carousel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-carousel-modal-close" onClick={closeModal} aria-label="Close">
              ×
            </button>
            <div className="image-carousel-modal-image-container">
              <img src={modalImage} alt="Full screenshot" className="image-carousel-modal-image" />
            </div>
            <div className="image-carousel-modal-description">
              <p>{modalDescription}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectImageCarousel;
