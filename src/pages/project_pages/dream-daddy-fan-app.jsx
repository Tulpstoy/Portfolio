import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import '../project_pages/project_reset.css';
import './dream-daddy-fan-app.css';

import projectData from '../../data/ProjectCards.json';

import Page1 from '../../assets/project1/Page1.png';
import Page2 from '../../assets/project1/Page2.png';
import Page3 from '../../assets/project1/Page3.png';
import Page4 from '../../assets/project1/Page4.png';

import ProjectHeader from '../../components/ProjectComponents/ProjectHeader';
import FeatureCard from '../../components/ProjectComponents/FeatureCard';
import CodeSnippet from '../../components/ProjectComponents/CodeSnippet';
import ProjectImageCarousel from '../../components/ProjectComponents/ProjectImageCarousel';
import ConnectSection from '../../components/ProjectComponents/ConnectSection';

const DreamDaddyFanApp = () => {
  const project = {
    ...projectData.projects.find(p => p.id === 1),
    plainTitle: "Dream Daddy Fan App",
    emojis: "🧔",
    category: "Multi-Page React Project"
  };

  const mockupImages = [Page1, Page2, Page3, Page4];
  const imageDescriptions = [
    "The home page, that displays a brief overview of what the game \"dream daddy\" is, and the ability to click a CTA button that takes you to the postcards page",
    "Slideable navigation bar activated by hamburger menu button, with interactable X icon.",
    "Post cards carousel that display the end-game postcards, short bios about each bachelor and an animated thumbnail \"dot-array\"",
    "An about the game page that explains what the game is and some core facts"
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
    <>
      <Helmet>
        <title>Dream Daddy Fan App - Micah Bron Portfolio</title>
        <meta name="description" content="A multi-page React fan app showcasing navigation, carousel implementation, and interactive elements. Features animated thumbnail navigation and smooth transitions." />
        <meta name="keywords" content="Dream Daddy Fan App, React, React Router, JavaScript, carousel, navigation, interactive elements, fan app, web development" />
        <meta property="og:title" content="Dream Daddy Fan App - Micah Bron Portfolio" />
        <meta property="og:description" content="A multi-page React fan app showcasing navigation, carousel implementation, and interactive elements." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects/1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dream Daddy Fan App - Micah Bron Portfolio" />
        <meta name="twitter:description" content="A multi-page React fan app showcasing navigation, carousel implementation, and interactive elements." />
      </Helmet>
      <div className="project-page">
        <ProjectHeader
          title={project.plainTitle}
          emojis={project.emojis}
          category={project.category}
          tags={[
            "React",
            "React Router",
            "JavaScript",
            "CSS3",
            "HTML5",
            "Component Architecture",
            "State Management",
            "Responsive Design",
            "UI Animation",
            "Carousel Implementation",
            "Navigation Systems",
            "Interactive Elements"
          ]}
          liveLink="http://dream-daddy-fan-project.micahbron.com/postcards"
          githubLink="https://github.com/Tulpstoy/Dream-Daddy-Fan-App"
        />

        <h2>Project Overview</h2>
        <div className="project-description">
          <p>
            This multi-page React fan app showcases my ability to build a navigable web experience using react-router and implement smooth, engaging animations. The centerpiece is an animated carousel featuring clickable thumbnail images of each dateable bachelor from Dream Daddy, replacing traditional navigation dots. Selecting a character reveals their post-game postcard and a brief bio, adding both interactivity and visual flair. The project also includes an About page with key facts about the game, demonstrating thoughtful content organization. Overall, this app highlights my skills in React, component-based architecture, routing, and UI animation.
          </p>
        </div>

        <div className="features-section">
          <h2>Notable Features</h2>
          <div className="features-grid">
            <FeatureCard
              title="Navigation Component"
              content="Implemented a slide-out navigation menu using react-burger-menu for a smooth, mobile-friendly experience. The menu includes links to all major sections of the app and features smooth transitions."
              emoji="🧭"
            />
            <FeatureCard
              title="Thumbnail Navigation"
              content="Created a custom thumbnail navigation component that replaces traditional carousel dots. Each thumbnail is clickable and shows a preview of the corresponding bachelor."
              emoji="🖼️"
            />
            <FeatureCard
              title="Postcards Component"
              content="Built a dynamic postcards page that displays each bachelor's end-game postcard along with their bio. Integrated with react-slick for smooth carousel functionality."
              emoji="💌"
            />
          </div>
        </div>

        <h2>Project Screenshots</h2>
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
              title="Navigation Component"
              id="navigation"
              code={navigationCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Thumbnail Navigation Component"
              id="thumbnailNav"
              code={thumbnailNavCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Thumbnail Navigation Styles"
              id="thumbnailNavCss"
              code={thumbnailNavCssCode}
              language="css"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Postcards Component"
              id="postcards"
              code={postcardsCode}
              language="javascript"
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

export default DreamDaddyFanApp;
