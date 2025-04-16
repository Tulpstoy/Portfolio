import React, { useState, useEffect } from 'react';
import './Project1Page.css';
import projectData from '../../data/ProjectCards.json';
import Page1 from './Page1.png';
import Page2 from './Page2.png';
import Page3 from './Page3.png';
import Page4 from './Page4.png';

const Project1Page = () => {
  const project = { 
    ...projectData.projects.find(p => p.id === 1), 
    plainTitle: "Dream Daddy Fan App",
    emojis: "🧔",
    category: "Multi-Page React Project" 
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const mockupImages = [Page1, Page2, Page3, Page4];
  const imageDescriptions = [
    "The home page, that displays a brief overview of what the game \"dream daddy\" is, and the ability to click a CTA button that takes you to the postcards page",
    "Slideable navigation bar activated by hamburger menu button, with interactable X icon.",
    "Post cards carousel that display the end-game postcards, short bios about each bachelor and an animated thumbnail \"dot-array\"",
    "An about the game page that explains what the game is and some core facts"
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
    console.log('Next clicked, new slide:', (currentSlide + 1) % mockupImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockupImages.length) % mockupImages.length);
    console.log('Prev clicked, new slide:', (currentSlide - 1 + mockupImages.length) % mockupImages.length);
  };

  const toggleFeature = (featureId) => {
    setActiveSection(activeSection === `feature-${featureId}` ? null : `feature-${featureId}`);
  };

  const toggleCode = (sectionId) => {
    setActiveSection(activeSection === `code-${sectionId}` ? null : `code-${sectionId}`);
  };

  const navigationCode = `import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <Menu>
        <Link className="menu-item" to="/">
          Home
        </Link>
        <Link className="menu-item" to="/postcards">
          Postcards
        </Link>
        <Link className="menu-item" to="/about">
          About the Game
        </Link>
      </Menu>
    </div>
  );
};

export default Navigation;`;

  const thumbnailNavCode = `import React from 'react';
import './ThumbnailNav.css';

const ThumbnailNav = ({ thumbnails, activeIndex, onClick }) => {
  return (
    <div className="thumbnail-nav">
      <div className="thumbnail-strip">
        {thumbnails.map((thumbnail, index) => (
          <div 
            key={index} 
            className={\`thumbnail-wrapper \${activeIndex === index ? 'active' : ''}\`}
            onClick={() => onClick(index)}
          >
            <img
              src={thumbnail}
              alt={\`Thumbnail \${index + 1}\`}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailNav;`;

  const thumbnailNavCssCode = `.thumbnail-nav {
    width: 100%;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
}

.thumbnail-strip {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 12px;
    width: 100%;
}

.thumbnail-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.thumbnail-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) brightness(0.7);
    transition: all 0.3s ease;
}

.thumbnail-wrapper.active img {
    filter: grayscale(0%) brightness(1);
    transform: scale(1.05);
}

.thumbnail-wrapper:hover img {
    filter: grayscale(50%) brightness(0.85);
}

.thumbnail-wrapper.active {
    box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
    border: 2px solid #FFD1DC;
}

@media (max-width: 768px) {
    .thumbnail-strip {
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
    }
}`;

  const postcardsCode = `import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThumbnailNav from '../components/ThumbnailNav';
import BachelorInfo from '../components/BachelorInfo';
import Welcome from '../components/Welcome';
import '../styles/Postcards.css';

// Import postcard images
import postcard1 from '../assets/postcards/brian.png';
import postcard2 from '../assets/postcards/craig.png';
import postcard3 from '../assets/postcards/damien.png';
import postcard4 from '../assets/postcards/hugo.png';
import postcard5 from '../assets/postcards/joseph.png';
import postcard6 from '../assets/postcards/mat.png';
import postcard7 from '../assets/postcards/robert.png';

// Import thumbnail images
import thumb1 from '../assets/thumbnails/brianThumbnail.png';
import thumb2 from '../assets/thumbnails/craigThumbnail.png';
import thumb3 from '../assets/thumbnails/damienThumbnail.png';
import thumb4 from '../assets/thumbnails/hugoThumbnail.png';
import thumb5 from '../assets/thumbnails/josephThumbnail.png';
import thumb6 from '../assets/thumbnails/matThumbnail.png';
import thumb7 from '../assets/thumbnails/robertThumbnail.png';

const bachelorData = [
  {
    name: "Brian Harding",
    bio: "A laid-back, fun-loving dad who enjoys grilling and spending time outdoors. As a single father to his daughter Daisy, Brian brings warmth and humor to every situation. His easygoing nature and dad jokes make him an endearing character in the neighborhood."
  },
  {
    name: "Craig Cahn",
    bio: "Your old college roommate turned fitness enthusiast. Now a successful business owner and father of three, Craig balances his passion for health with being a loving single dad. Despite his busy schedule, he always makes time for his friends and family."
  },
  {
    name: "Damien Bloodmarch",
    bio: "A romantic Victorian era enthusiast with a gothic aesthetic. Damien works as an IT professional while maintaining his love for the macabre and vintage culture. A caring father to Lucien, he proves that you can be both mysterious and warmhearted."
  },
  {
    name: "Hugo Vega",
    bio: "A passionate high school teacher who takes pride in education and literature. While dealing with his son Ernest's rebellious phase, Hugo maintains his optimistic outlook and dedication to helping others learn and grow."
  },
  {
    name: "Joseph Christiansen",
    bio: "The neighborhood youth minister with a perfect family image. Joseph is known for his baking skills and organizing community events. Behind his charismatic personality lies a complex character dealing with personal struggles."
  },
  {
    name: "Mat Sella",
    bio: "The cool, music-loving owner of the local Coffee Spoon café. A widower raising his daughter alone, Mat channels his passion for music and coffee into creating a welcoming space for the community while dealing with his own social anxiety."
  },
  {
    name: "Robert Small",
    bio: "A mysterious, rough-around-the-edges handyman with a dark sense of humor. Robert enjoys telling supernatural stories and going on late-night adventures. Though initially distant, he has a deep emotional core and a complex past."
  }
];

function Postcards() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current, next) => setActiveIndex(next),
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand'
  };

  const postcards = [postcard1, postcard2, postcard3, postcard4, postcard5, postcard6, postcard7];
  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, thumb7];

  const handleThumbnailClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="postcards-page">
      <div className="grid-container">
        <div className="bio-section">
          <Welcome />
          <BachelorInfo
            name={bachelorData[activeIndex].name}
            bio={bachelorData[activeIndex].bio}
          />
        </div>
        <div className="carousel-section">
          <div className="slider-wrapper">
            <Slider {...settings} ref={sliderRef}>
              {postcards.map((postcard, index) => (
                <div key={index} className="postcard-img">
                  <img src={postcard} alt={\`Postcard \${index + 1}\`} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="thumbnail-section">
            <ThumbnailNav
              thumbnails={thumbnails}
              activeIndex={activeIndex}
              onClick={(index) => {
                handleThumbnailClick(index);
                setActiveIndex(index);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postcards;`;

  return (
    <div className="project-page">
      {/* Project Header */}
      <div className="project-header">
        <div className="project-title-section">
          <h1>
            <span className="gradient-text">{project.plainTitle}</span>
            <span className="title-emojis">{project.emojis}</span>
          </h1>
          <p className="project-category">{project.category}</p>
        </div>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          <button className="live-demo">Live Demo</button>
          <button className="github">Github</button>
        </div>
      </div>

      {/* Project Overview */}
      <section className="project-section">
        <h2>Overview.</h2>
        <p>This multi-page React fan app showcases my ability to build a navigable web experience using react-router and implement smooth, engaging animations. The centerpiece is an animated carousel featuring clickable thumbnail images of each dateable bachelor from Dream Daddy, replacing traditional navigation dots. Selecting a character reveals their post-game postcard and a brief bio, adding both interactivity and visual flair. The project also includes an About page with key facts about the game, demonstrating thoughtful content organization. Overall, this app highlights my skills in React, component-based architecture, routing, and UI animation.</p>
      </section>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card navigation-feature">
          <div 
            className="feature-header"
            onClick={() => toggleFeature('navigation')}
          >
            <div className="feature-title">
              <h3>Navigation Component</h3>
              <button className="feature-toggle">
                <span className={`plus-icon ${activeSection === 'feature-navigation' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
          </div>
          <div className={`feature-content navigation-content ${activeSection === 'feature-navigation' ? 'is-expanded' : ''}`}>
            <p>
              Implemented a slide-out navigation menu using react-burger-menu for a smooth, mobile-friendly experience.
              The menu includes links to all major sections of the app and features smooth transitions.
            </p>
          </div>
        </div>

        <div className="feature-card thumbnail-feature">
          <div 
            className="feature-header"
            onClick={() => toggleFeature('thumbnailNav')}
          >
            <div className="feature-title">
              <h3>Thumbnail Navigation</h3>
              <button className="feature-toggle">
                <span className={`plus-icon ${activeSection === 'feature-thumbnailNav' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
          </div>
          <div className={`feature-content thumbnail-content ${activeSection === 'feature-thumbnailNav' ? 'is-expanded' : ''}`}>
            <p>
              Created a custom thumbnail navigation component that replaces traditional carousel dots.
              Each thumbnail is clickable and shows a preview of the corresponding bachelor.
            </p>
          </div>
        </div>

        <div className="feature-card postcards-feature">
          <div 
            className="feature-header"
            onClick={() => toggleFeature('postcards')}
          >
            <div className="feature-title">
              <h3>Postcards Component</h3>
              <button className="feature-toggle">
                <span className={`plus-icon ${activeSection === 'feature-postcards' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
          </div>
          <div className={`feature-content postcards-content ${activeSection === 'feature-postcards' ? 'is-expanded' : ''}`}>
            <p>
              Built a dynamic postcards page that displays each bachelor's end-game postcard along with their bio.
              Integrated with react-slick for smooth carousel functionality.
            </p>
          </div>
        </div>
      </div>

      {/* Mockup Section */}
      <section className="mockup-section">
        <h2>Project Screenshots.</h2>
        <div className="mockup-carousel">
          <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous slide">
            <span className="arrow">←</span>
          </button>
          <div className="mockup-image">
            <img 
              src={mockupImages[currentSlide]} 
              alt={`Project screenshot ${currentSlide + 1}`} 
              onError={(e) => console.error('Image failed to load:', e)}
              onLoad={() => console.log('Image loaded successfully:', currentSlide)}
            />
          </div>
          <button className="carousel-button next" onClick={nextSlide} aria-label="Next slide">
            <span className="arrow">→</span>
          </button>
          <p className="image-description">{imageDescriptions[currentSlide]}</p>
          <div className="carousel-dots">
            {mockupImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  console.log('Dot clicked:', index);
                  setCurrentSlide(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Code Snippets Section */}
      <section className="code-snippets-section">
        <h2>Code Implementation.</h2>
        <div className="code-sections">
          <div className="code-section">
            <div 
              className="code-header"
              onClick={() => toggleCode('navigation')}
            >
              <h4>Navigation Component</h4>
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
              onClick={() => toggleCode('thumbnailNav')}
            >
              <h4>Thumbnail Navigation Component</h4>
              <button className="code-toggle">
                <span className={`plus-icon ${activeSection === 'code-thumbnailNav' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
            <div className={`code-content ${activeSection === 'code-thumbnailNav' ? 'is-expanded' : ''}`}>
              <pre><code>{thumbnailNavCode}</code></pre>
            </div>
          </div>

          <div className="code-section">
            <div 
              className="code-header"
              onClick={() => toggleCode('thumbnailNavCss')}
            >
              <h4>Thumbnail Navigation Styles</h4>
              <button className="code-toggle">
                <span className={`plus-icon ${activeSection === 'code-thumbnailNavCss' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
            <div className={`code-content ${activeSection === 'code-thumbnailNavCss' ? 'is-expanded' : ''}`}>
              <pre><code>{thumbnailNavCssCode}</code></pre>
            </div>
          </div>

          <div className="code-section">
            <div 
              className="code-header"
              onClick={() => toggleCode('postcards')}
            >
              <h4>Postcards Component</h4>
              <button className="code-toggle">
                <span className={`plus-icon ${activeSection === 'code-postcards' ? 'is-active' : ''}`}>+</span>
              </button>
            </div>
            <div className={`code-content ${activeSection === 'code-postcards' ? 'is-expanded' : ''}`}>
              <pre><code>{postcardsCode}</code></pre>
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

export default Project1Page; 