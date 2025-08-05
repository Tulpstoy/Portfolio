import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlus } from 'react-icons/fa';
import './Project4Page.css';
import projectData from '../../data/ProjectCards.json';
import stonewall1 from './stonewall1.png';
import stonewall2 from './stonewall2.png';
import stonewall3 from './stonewall3.png';
import stonewall4 from './stonewall4.png';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const Project4Page = () => {
  const project = projectData.projects.find(p => p.id === 4);
  const [activeSection, setActiveSection] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const mockupImages = [stonewall1, stonewall2, stonewall3, stonewall4];
  const imageDescriptions = [
    "Interactive timeline of the Stonewall Riots",
    "Marsha P. Johnson's story and legacy",
    "The Brick-Throwing Myth interactive scene",
    "Main menu and navigation interface"
  ];

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockupImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockupImages.length) % mockupImages.length);
  };

  const animationCode = `// GSAP Animation for the Timeline
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineAnimation = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    },
  });

  timeline
    .from('.event-card', {
      opacity: 0,
      y: 50,
      stagger: 0.5,
    })
    .from('.event-image', {
      scale: 0.8,
      duration: 1,
      stagger: 0.3,
    });
};`;

  const interactiveCode = `// Interactive Storytelling Component
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StoryScene = ({ scene, onChoice }) => {
  const [currentDialog, setCurrentDialog] = useState(0);

  const dialogVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="story-scene">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDialog}
          variants={dialogVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="dialog-box"
        >
          <p>{scene.dialog[currentDialog]}</p>
          {scene.choices && (
            <div className="choice-container">
              {scene.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoice(choice.nextScene)}
                  className="choice-button"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};`;

  const codeExamples = [
    {
      title: "Interactive Animation System",
      code: `// Animation keyframes for interactive elements
const throwBrick = keyframes\`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(100px, -150px) rotate(180deg);
  }
  50% {
    transform: translate(200px, 0) rotate(360deg);
  }
  75% {
    transform: translate(100px, -50px) rotate(540deg);
  }
  100% {
    transform: translate(0, 0) rotate(720deg);
  }
\`;

const flipImage = keyframes\`
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(180deg);
  }
\`;

// Interactive elements with animations
const BrickImage = styled.img\`
  width: \${props => props.isDesktop ? '60px' : '80px'};
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: \${props => props.isThrown ? throwBrick : 'none'} 1.5s cubic-bezier(.17,.67,.83,.67);
  z-index: 2;

  &:hover {
    transform: \${props => props.isThrown ? 'none' : 'scale(1.1)'};
  }
\`;

const CopsImage = styled.img\`
  width: \${props => props.isDesktop ? '300px' : '200px'};
  height: \${props => props.isDesktop ? '240px' : '150px'};
  object-fit: cover;
  border-radius: \${props => props.isDesktop ? '12px' : '8px'};
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  animation: \${props => props.isHit ? flipImage : 'none'} 0.8s ease-in-out forwards;
  transform-style: preserve-3d;
\`;`,
    },
    {
      title: "Interactive Storytelling Logic",
      code: `// Interactive storytelling component with state management
const StoryBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [brickThrown, setBrickThrown] = useState(false);
  const [copsHit, setCopsHit] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const handleBrickClick = () => {
    if (!brickThrown) {
      setBrickThrown(true);
      // Set cops as hit after brick animation starts
      setTimeout(() => {
        setCopsHit(true);
      }, 750); // Half of the brick animation duration
    }
  };

  // Touch-based navigation for mobile experience
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < pages.length - 1) {
      nextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      previousPage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentPage]);

  // Render interactive content with animations
  return (
    <InteractiveSection isDesktop={isDesktopMode}>
      <ThrowPrompt isVisible={!brickThrown}>
        Click the brick to throw it at the cops
      </ThrowPrompt>
      <BrickImage 
        src={brick} 
        alt="Brick from Stonewall" 
        onClick={handleBrickClick}
        isThrown={brickThrown}
        isDesktop={isDesktopMode}
      />
      <CopsImage 
        src={cops} 
        alt="Police at Stonewall" 
        isHit={copsHit}
        isDesktop={isDesktopMode}
      />
      <RevealText isVisible={brickThrown} isDesktop={isDesktopMode}>
        <h3>The Truth About the First Brick</h3>
        <p>
          While the "first brick" at Stonewall has become legendary, 
          the truth is that no one knows for certain who threw the 
          first object during the uprising...
        </p>
      </RevealText>
    </InteractiveSection>
  );
};`,
    },
    {
      title: "Responsive Layout System",
      code: `// Responsive layout components for desktop and mobile
const DesktopLayout = styled.div\`
  display: grid;
  grid-template-columns: minmax(600px, 1fr) minmax(500px, 800px);
  height: 100vh;
  background: #1a1a1a;

  @media (max-width: 768px) {
    display: none;
  }
\`;

const MobileLayout = styled.div\`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: 769px) {
    display: \${props => props.isDesktopMode ? 'none' : 'flex'};
  }
\`;

// Swipe navigation for mobile
const SwipeZone = styled.div\`
  position: absolute;
  top: 0;
  \${props => props.side === 'left' ? 'left: 0;' : 'right: 0;'}
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(
    \${props => props.side === 'left' 
      ? 'to right, rgba(0,0,0,0.2), transparent'
      : 'to left, rgba(0,0,0,0.2), transparent'}
  );
  pointer-events: \${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 25%;
  }
\`;`,
    },
  ];

  // Add scroll to top effect at the beginning of the component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="project-page">
      {/* Project Header */}
      <header className="project-header">
        <div className="project-title-section">
          <h1>
            <span className="gradient-text">{project.title}</span>
          </h1>
          <p className="project-category">{project.category}</p>
          <div className="project-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="project-actions">
            <a href="https://stonewall-storybook.micahbron.com/" target="_blank" rel="noopener noreferrer" className="live-demo">
              <FaExternalLinkAlt /> Live Demo
            </a>
            <a href="https://github.com/Tulpstoy/Stonewall-Storybook" target="_blank" rel="noopener noreferrer" className="github">
              <FaGithub /> View Code
            </a>
          </div>
        </div>
      </header>

      {/* Project Overview */}
      <section className="project-section">
        <h2>Project Overview</h2>
        <p>
          The Stonewall Storybook is an interactive web experience that educates users about the historic 
          Stonewall uprising through engaging storytelling and animation. This project combines historical 
          accuracy with modern web technologies to create an immersive learning experience about this 
          pivotal moment in LGBTQ+ history.
        </p>
        <div className="storybook-features">
          <h3>What's in This Storybook</h3>
          <div className="feature-list">
            <div className="feature-item">
              <h4>🏳️‍🌈 The Stonewall Riots</h4>
              <p>A clear, accessible overview of what really happened the night the riots began.</p>
            </div>
            <div className="feature-item">
              <h4>🌟 Marsha P. Johnson</h4>
              <p>A dedicated page honoring her life, activism, and role in the movement.</p>
            </div>
            <div className="feature-item">
              <h4>🧱 The Brick-Throwing Myth</h4>
              <p>An animated moment exploring the infamous "first brick" story—and what actually went down.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="project-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {/* Animation Feature */}
          <div className="feature-card">
            <div 
              className="feature-header"
              onClick={() => toggleSection('animation')}
            >
              <div className="feature-title">
                <h3>Interactive Animation</h3>
                <button className="feature-toggle">
                  <FaPlus className={`plus-icon ${activeSection === 'animation' ? 'is-active' : ''}`} />
                </button>
              </div>
            </div>
            <div className={`feature-content ${activeSection === 'animation' ? 'is-expanded' : ''}`}>
              <p>
                Using GSAP and Framer Motion, the storybook features smooth, responsive animations that bring 
                historical events to life. Each scene is carefully choreographed to enhance the narrative 
                while maintaining historical accuracy.
              </p>
            </div>
          </div>

          {/* Interactive Storytelling Feature */}
          <div className="feature-card">
            <div 
              className="feature-header"
              onClick={() => toggleSection('interactive')}
            >
              <div className="feature-title">
                <h3>Interactive Storytelling</h3>
                <button className="feature-toggle">
                  <FaPlus className={`plus-icon ${activeSection === 'interactive' ? 'is-active' : ''}`} />
                </button>
              </div>
            </div>
            <div className={`feature-content ${activeSection === 'interactive' ? 'is-expanded' : ''}`}>
              <p>
                The story unfolds through an intuitive, choice-based narrative system. Users can explore 
                different perspectives and learn about the events through interactive dialogue and 
                decision points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup Section */}
      <section className="mockup-section">
        <h2>Project Screenshots</h2>
        <div className="mockup-carousel">
          <button className="carousel-button prev" onClick={prevSlide}>
            <span className="arrow">←</span>
          </button>
          <div className="mockup-image">
            <img 
              src={mockupImages[currentSlide]} 
              alt={`Project screenshot ${currentSlide + 1}`}
            />
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            <span className="arrow">→</span>
          </button>
          <p className="image-description">{imageDescriptions[currentSlide]}</p>
          <div className="carousel-dots">
            {mockupImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Code Sections */}
      <section className="code-sections">
        <h2>Code Examples</h2>
        
        {/* Animation Code */}
        <div className="code-section">
          <div 
            className="code-header"
            onClick={() => toggleSection('animationCode')}
          >
            <h4>Timeline Animation</h4>
            <button className="code-toggle">
              <FaPlus className={`plus-icon ${activeSection === 'animationCode' ? 'is-active' : ''}`} />
            </button>
          </div>
          <div className={`code-content ${activeSection === 'animationCode' ? 'is-expanded' : ''}`}>
            <pre><code>{animationCode}</code></pre>
          </div>
        </div>

        {/* Interactive Storytelling Code */}
        <div className="code-section">
          <div 
            className="code-header"
            onClick={() => toggleSection('interactiveCode')}
          >
            <h4>Interactive Storytelling Component</h4>
            <button className="code-toggle">
              <FaPlus className={`plus-icon ${activeSection === 'interactiveCode' ? 'is-active' : ''}`} />
            </button>
          </div>
          <div className={`code-content ${activeSection === 'interactiveCode' ? 'is-expanded' : ''}`}>
            <pre><code>{interactiveCode}</code></pre>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <div className="connect-content">
          <h2>Connect With Me</h2>
          <p>Let's work together to bring your ideas to life.</p>
          <div className="email-container">
            <a 
              href="mailto:micah.bron@icloud.com" 
              className="email"
              aria-label="Send me an email"
            >
              micah.bron@icloud.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project4Page; 