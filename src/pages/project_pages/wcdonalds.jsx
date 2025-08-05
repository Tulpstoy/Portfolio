import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import '../project_pages/project_reset.css';
import './wcdonalds.css';

import projectData from '../../data/ProjectCards.json';

import wcd1 from '../../assets/project2/wcd1.png';
import wcd2 from '../../assets/project2/wcd2.png';
import wcdDesignOverview from '../../assets/project2/wcd_designoverview.png';
import wcdDesignOverviewPortrait from '../../assets/project2/wcd_designoverviewportrait.png';
import wcdExploration from '../../assets/project2/wcd_exploration.mp4';

import ProjectHeader from '../../components/ProjectComponents/ProjectHeader';
import FeatureCard from '../../components/ProjectComponents/FeatureCard';
import CodeSnippet from '../../components/ProjectComponents/CodeSnippet';
import ProjectImageCarousel from '../../components/ProjectComponents/ProjectImageCarousel';
import ConnectSection from '../../components/ProjectComponents/ConnectSection';
import StudioVideoPlayer from '../../components/ProjectComponents/StudioDisplayPlayer';

const Project2Page = () => {
  const project = {
    ...projectData.projects.find(p => p.id === 2),
    plainTitle: "WcDonald's Website",
    emojis: "🍔",
    category: "Pixel-Perfect Design Implementation"
  };

  const mockupImages = [wcd1, wcd2, wcdDesignOverview, wcdDesignOverviewPortrait];
  const imageDescriptions = [
    "Desktop view of the WcDonald's website homepage, showcasing the main navigation and hero section",
    "Desktop view of the menu page, demonstrating the responsive grid layout and product cards",
    "Overview of the Figma design showing the complete website layout and components",
    "Portrait view of the Figma design showing the mobile-first approach and responsive design elements"
  ];

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFeature = (id) => {
    setActiveSection(prev => prev === `feature-${id}` ? null : `feature-${id}`);
  };

  const toggleCode = (id) => {
    setActiveSection(prev => prev === `code-${id}` ? null : `code-${id}`);
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

.bm-item-list {
  padding: 0.8em;
}

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
    <>
      <Helmet>
        <title>WcDonald's Website - Micah Bron Portfolio</title>
        <meta name="description" content="A pixel-perfect implementation of a Figma design showcasing responsive design, interactive navigation, and modern CSS techniques including CSS Grid and Flexbox." />
        <meta name="keywords" content="WcDonald's, responsive design, CSS Grid, Flexbox, HTML5, CSS3, JavaScript, Figma, mobile-first design, web development" />
        <meta property="og:title" content="WcDonald's Website - Micah Bron Portfolio" />
        <meta property="og:description" content="A pixel-perfect implementation of a Figma design showcasing responsive design and modern CSS techniques." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects/2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WcDonald's Website - Micah Bron Portfolio" />
        <meta name="twitter:description" content="A pixel-perfect implementation of a Figma design showcasing responsive design and modern CSS techniques." />
      </Helmet>
      <div className="project-page">
        <ProjectHeader
          title={project.plainTitle}
          emojis={project.emojis}
          category={project.category}
          tags={[
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Design",
            "Figma",
            "Flexbox",
            "CSS Grid",
            "Mobile-First Design",
            "UI Implementation",
            "Web Accessibility",
            "Vanilla JS",
            "Design Systems"
          ]}
          githubLink="https://github.com/Tulpstoy/WcDonalds"
        />

        <h2>Project Overview</h2>
        <div className="project-description">
          <p>
            WcDonald's is a pixel-perfect implementation of a Figma design, showcasing my ability to translate
            design specifications into clean, responsive code. The project demonstrates proficiency in HTML5,
            CSS3, and JavaScript, with a strong focus on responsive design principles and mobile-first development.
          </p>
        </div>

        <h2>Video Mockup</h2>
        <div className="video-mockup-section">
          <StudioVideoPlayer videoSrc={wcdExploration} />
        </div>  

        <div className="features-section">
          <h2>Notable Features</h2>
          <div className="features-grid">
            <FeatureCard
              title="Responsive Design"
              content="Implemented a fully responsive layout that adapts seamlessly across mobile, tablet, and desktop viewports. Used CSS Grid and Flexbox for modern layout techniques, with careful attention to breakpoints and fluid typography."
              emoji="📱"
            />
            <FeatureCard
              title="Interactive Navigation"
              content="Created a responsive navigation system with smooth transitions and mobile-friendly hamburger menu. Implemented with vanilla JavaScript for optimal performance and accessibility."
              emoji="🧭"
            />
          </div>
        </div>

        <h2>Design Implementation</h2>
        <div className="mockup-section">
          <ProjectImageCarousel
            images={mockupImages}
            descriptions={imageDescriptions}
          />
        </div>

        <h2>Code Snippets</h2>
        <section className="code-snippets-section">
          <div className="code-sections">
            <CodeSnippet
              title="Navigation System"
              id="navigation"
              code={navigationCode}
              language="css"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Responsive Grid Layout"
              id="responsiveGrid"
              code={responsiveGridCode}
              language="css"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Responsive Grid Styles"
              id="responsiveGridCss"
              code={responsiveGridCssCode}
              language="css"
              activeSection={activeSection}
              toggle={toggleCode}
            />
          </div>
        </section>

        <ConnectSection />
      </div>
    </>
  );
};

export default Project2Page;
