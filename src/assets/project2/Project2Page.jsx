import React, { useState, useEffect } from 'react';
import './Project2Page.css';
import projectData from '../../data/ProjectCards.json';
import wcd1 from './wcd1.png';
import wcd2 from './wcd2.png';
import wcdDesignOverview from './wcd_designoverview.png';
import wcdDesignOverviewPortrait from './wcd_designoverviewportrait.png';
import wcdExploration from './wcd_exploration.mp4';
import { FaGithub } from 'react-icons/fa';

const Project2Page = () => {
  const project = { 
    ...projectData.projects.find(p => p.id === 2), 
    plainTitle: "WcDonald's Website",
    emojis: "🍔",
    category: "Pixel-Perfect Design Implementation" 
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [expandedFeatures, setExpandedFeatures] = useState({
    responsive: false,
    navigation: false
  });
  const [expandedCodes, setExpandedCodes] = useState({
    navigation: false,
    responsiveGrid: false,
    responsiveGridCss: false
  });
  
  const mockupImages = [wcd1, wcd2, wcdDesignOverview, wcdDesignOverviewPortrait];
  const imageDescriptions = [
    "Desktop view of the WcDonald's website homepage, showcasing the main navigation and hero section",
    "Desktop view of the menu page, demonstrating the responsive grid layout and product cards",
    "Overview of the Figma design showing the complete website layout and components",
    "Portrait view of the Figma design showing the mobile-first approach and responsive design elements"
  ];

  useEffect(() => {
    console.log('Current slide:', currentSlide);
    console.log('Available images:', mockupImages);
  }, [currentSlide]);

  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockupImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockupImages.length) % mockupImages.length);
  };

  const toggleFeature = (featureId) => {
    setActiveSection(activeSection === `feature-${featureId}` ? null : `feature-${featureId}`);
  };

  const toggleCode = (sectionId) => {
    setActiveSection(activeSection === `code-${sectionId}` ? null : `code-${sectionId}`);
  };

  const navigationCode = `// Position and sizing of burger button
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
  transition: transform 0.3s ease;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #FFFFFF !important;
  transition: all 0.3s ease;
}

/* Color/shape of burger icon bars on hover */
.bm-burger-bars-hover {
  background: #FFFFFF !important;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
  transform: scale(1.1);
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #FFFFFF !important;
}

/* General sidebar styles */
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

.bm-menu {
  background: rgba(255, 105, 180, 0.95);
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Wrapper for item list */
.bm-item-list {
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
  color: #FFFFFF;
  margin-bottom: 10px;
  text-align: left;
  text-decoration: none;
  transition: color 0.2s;
}

.bm-item:hover {
  color: #FFD1DC;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}`;

  const responsiveGridCode = `/* Base Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* The Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
    margin: auto;
}

/* Item Styles */
.title-box, .image-box, .text-box, .map-box {
    border: 2px solid black;
    border-radius: 10px;
    margin: 8px;
}

.gallery-item {
    border: 2px solid black;
    border-radius: 10px;
    overflow: hidden;
}

.title-box {
    color: yellow;
    background-color: red;
    align-items: center;
    text-align: center;
    font-size: 2em;
}

/* Image Box Specific Styles */
.image-box {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    overflow: hidden;
}

.image-box img {
    border: 2px solid black;
    border-radius: 10px;
    width: 120%;
    height: 120%;
    object-fit: cover;
}

/* Text Box Specific Styles */
.text-box {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    text-align: center;
}

/* Mobile Styles */
@media (max-width: 600px) {
    .frame {
        width: 320px;
        max-width: 320px;
        margin: auto;
    }

    .grid {
        width: 320px;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 8px;
        margin: auto;
    }

    .title-box,
    .image-box,
    .text-box,
    .map-box,
    .gallery-item {
        grid-column: span 4;
        margin: 8px 0; 
    }
}

/* Tablet Styles */
@media (min-width: 601px) and (max-width: 1024px) {
    .frame {
        width: 834px;
        max-width: 834px;
        margin: auto;
    }

    .grid {
        width: 768px;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 16px;
        margin: auto;
    }

    .title-box {
        grid-column: span 12;
    }

    .image-box,
    .text-box {
        grid-column: span 6;
    }

    .gallery-item {
        grid-column: span 4;
    }

    .map-box {
        grid-column: span 12;
    }
}

/* Desktop Styles */
@media (min-width: 1025px) {
    .frame {
        width: 1440px;
        max-width: 1440px;
        margin: auto;
    }

    .grid {
        width: 1280px;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 20px;
        margin: auto;
    }

    .title-box {
        grid-column: span 12;
    }

    .image-box,
    .text-box {
        grid-column: span 6;
    }

    .gallery-item {
        grid-column: span 4;
    }

    .map-box {
        grid-column: span 12;
    }
}`;

  const responsiveGridCssCode = `/* Banner Styles */
.banner {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
}

.banner img {
    width: 100%;
    height: auto;
}

.banner-text {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    font-size: 2em;
}

.banner h2 {
    margin: 0.2em 0;
    color: yellow;
}

/* Gallery Item Specific Styles */
.gallery-item {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.gallery-item img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

/* Mobile Styles */
@media (max-width: 600px) {
    header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        margin-left: 0; 
    }

    .hamburger-menu {
        display: block;
        margin-left: auto; 
    }

    nav ul.menu {
        display: none;
    }

    .banner {
        height: 100vh; 
        margin-top: 0; 
        margin-bottom: 16px;
    }

    .banner img {
        width: 100%;
        height: 100%; 
        object-fit: cover; 
    }

    .banner h2 {
        font-size: 1.2em;
    }
}

/* Tablet Styles */
@media (min-width: 601px) and (max-width: 1024px) {
    nav ul.menu {
        display: flex;
    }

    .hamburger-menu {
        display: none;
    }

    header, footer {
        flex-direction: row;
    }

    .banner {
        height: 100vh; 
        margin-top: 0; 
        margin-bottom: 16px;
    }

    .banner img {
        width: 100%;
        height: 100%; 
        object-fit: cover; 
    }

    .banner h2 {
        font-size: 2em;
    }
}

/* Desktop Styles */
@media (min-width: 1025px) {
    nav ul.menu {
        display: flex;
    }

    .hamburger-menu {
        display: none;
    }

    header, footer {
        flex-direction: row;
    }

    .banner {
        height: 100vh; 
        margin-top: 0; 
        margin-bottom: 16px;
    }

    .banner img {
        width: 100%;
        height: 100%; 
        object-fit: cover; 
    }

    .banner h2 {
        font-size: 2.5em;
    }
}`;

  return (
    <div className="project-page">
      {/* Project Header */}
      <div className="project-header">
        <div className="project-title-section">
          <h1>
            {project.plainTitle}
            <span className="title-emojis">{project.emojis}</span>
          </h1>
          <p className="project-category">{project.category}</p>
          <div className="project-tags">
            <span className="tag">HTML5</span>
            <span className="tag">CSS3</span>
            <span className="tag">JavaScript</span>
            <span className="tag">Responsive Design</span>
            <span className="tag">Figma</span>
          </div>
          <div className="project-actions">
            <button className="live-demo">View Live Demo</button>
            <a href="https://github.com/Tulpstoy/WcDonalds" target="_blank" rel="noopener noreferrer" className="github">
              <FaGithub /> View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="project-section">
        <h2>Project Overview</h2>
        <p>
          WcDonald's is a pixel-perfect implementation of a Figma design, showcasing my ability to translate
          design specifications into clean, responsive code. The project demonstrates proficiency in HTML5,
          CSS3, and JavaScript, with a strong focus on responsive design principles and mobile-first development.
        </p>
      </div>

      {/* Project Demo Video */}
      <div className="video-section">
        <div className="video-container">
          <video 
            controls
            playsInline
            className="demo-video"
          >
            <source src={wcdExploration} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card responsive-feature">
          <div 
            className="feature-header"
            onClick={() => toggleFeature('responsive')}
          >
            <div className="feature-title">
              <h3>Responsive Design</h3>
              <button className="feature-toggle">
                <span className={`plus-icon ${activeSection === 'feature-responsive' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
          </div>
          <div className={`feature-content responsive-content ${activeSection === 'feature-responsive' ? 'is-expanded' : ''}`}>
            <p>
              Implemented a fully responsive layout that adapts seamlessly across mobile, tablet, and desktop
              viewports. Used CSS Grid and Flexbox for modern layout techniques, with careful attention to
              breakpoints and fluid typography.
            </p>
          </div>
        </div>

        <div className="feature-card interactive-feature">
          <div 
            className="feature-header"
            onClick={() => toggleFeature('navigation')}
          >
            <div className="feature-title">
              <h3>Interactive Navigation</h3>
              <button className="feature-toggle">
                <span className={`plus-icon ${activeSection === 'feature-navigation' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
          </div>
          <div className={`feature-content interactive-content ${activeSection === 'feature-navigation' ? 'is-expanded' : ''}`}>
            <p>
              Created a responsive navigation system with smooth transitions and mobile-friendly hamburger menu.
              Implemented with vanilla JavaScript for optimal performance and accessibility.
            </p>
          </div>
        </div>
      </div>

      {/* Mockup Section */}
      <div className="mockup-section">
        <h2>Design Implementation</h2>
        <div className="mockup-carousel">
          <div className="mockup-image">
            <img src={mockupImages[currentSlide]} alt={`WcDonald's Design ${currentSlide + 1}`} />
          </div>
          <p className="image-description">{imageDescriptions[currentSlide]}</p>
          <button className="carousel-button prev" onClick={prevSlide}>
            <span className="arrow">←</span>
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            <span className="arrow">→</span>
          </button>
          <div className="carousel-dots">
            {mockupImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Code Snippets Section */}
      <section className="code-snippets-section">
        <h2>Code Implementation.</h2>
        <div className="code-sections">
          <div className="code-section">
            <div 
              className="code-header"
              onClick={() => toggleCode('navigation')}
            >
              <h4>Navigation System</h4>
              <button className="code-toggle">
                <span className={`plus-icon ${activeSection === 'code-navigation' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
            <div className={`code-content ${activeSection === 'code-navigation' ? 'is-expanded' : ''}`}>
              <pre><code>{navigationCode}</code></pre>
            </div>
          </div>

          <div className="code-section">
            <div 
              className="code-header"
              onClick={() => toggleCode('responsiveGrid')}
            >
              <h4>Responsive Grid Layout</h4>
              <button className="code-toggle">
                <span className={`plus-icon ${activeSection === 'code-responsiveGrid' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
            <div className={`code-content ${activeSection === 'code-responsiveGrid' ? 'is-expanded' : ''}`}>
              <pre><code>{responsiveGridCode}</code></pre>
            </div>
          </div>

          <div className="code-section">
            <div 
              className="code-header"
              onClick={() => toggleCode('responsiveGridCss')}
            >
              <h4>Responsive Grid Styles</h4>
              <button className="code-toggle">
                <span className={`plus-icon ${activeSection === 'code-responsiveGridCss' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
            <div className={`code-content ${activeSection === 'code-responsiveGridCss' ? 'is-expanded' : ''}`}>
              <pre><code>{responsiveGridCssCode}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <div className="connect-content">
          <h2>Connect With Me.</h2>
          <p>Let's work together to bring your ideas to life.</p>
          <div className="email-container">
            <span className="email">micah.bron@icloud.com</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project2Page;