import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import '../project_pages/project_reset.css';
import './stonewall-storybook.css';

import projectData from '../../data/ProjectCards.json';

import page1 from '../../assets/project4/page1.png';
import page2 from '../../assets/project4/page2.png';
import page3 from '../../assets/project4/page3.png';
import cardimage from '../../assets/project4/cardimage.png';

import ProjectHeader from '../../components/ProjectComponents/ProjectHeader';
import FeatureCard from '../../components/ProjectComponents/FeatureCard';
import CodeSnippet from '../../components/ProjectComponents/CodeSnippet';
import ProjectImageCarousel from '../../components/ProjectComponents/ProjectImageCarousel';
import ConnectSection from '../../components/ProjectComponents/ConnectSection';

const StonewallStorybook = () => {
  const project = {
    ...projectData.projects.find(p => p.id === 4),
    plainTitle: "Stonewall Storybook",
    emojis: "🏳️‍🌈",
    category: "Interactive Web Experience"
  };

  const mockupImages = [page1, page2, page3];
  const imageDescriptions = [
    "Interactive timeline of the Stonewall Riots",
    "Marsha P. Johnson's story and legacy",
    "The Brick-Throwing Myth interactive scene"
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

  const interactiveAnimationCode = `// Animation keyframes for interactive elements
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
\`;`;

  const storytellingLogicCode = `// Interactive storytelling component with state management
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
};`;

  const responsiveLayoutCode = `// Responsive layout components for desktop and mobile
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
\`;`;

  return (
    <>
      <Helmet>
        <title>Stonewall Storybook - Micah Bron Portfolio</title>
        <meta name="description" content="An interactive web experience that educates users about the historic Stonewall uprising through engaging storytelling and animation. Features GSAP animations and interactive storytelling." />
        <meta name="keywords" content="Stonewall Storybook, LGBTQ+ history, interactive storytelling, GSAP, Framer Motion, React, JavaScript, educational web app, Stonewall Riots" />
        <meta property="og:title" content="Stonewall Storybook - Micah Bron Portfolio" />
        <meta property="og:description" content="An interactive web experience that educates users about the historic Stonewall uprising through engaging storytelling and animation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects/4" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stonewall Storybook - Micah Bron Portfolio" />
        <meta name="twitter:description" content="An interactive web experience that educates users about the historic Stonewall uprising through engaging storytelling and animation." />
      </Helmet>
      <div className="project-page">
        <ProjectHeader
          title={project.plainTitle}
          emojis={project.emojis}
          category={project.category}
          tags={[
            "React",
            "JavaScript",
            "CSS3",
            "HTML5",
            "Interactive Design",
            "Animations",
            "Educational",
            "GSAP",
            "Framer Motion",
            "Styled Components",
            "Responsive Design",
            "Storytelling"
          ]}
          liveLink="https://stonewall-storybook.micahbron.com/"
          githubLink="https://github.com/Tulpstoy/Stonewall-Storybook"
        />

        <h2>Project Overview</h2>
        <div className="project-description">
          <p>
            The Stonewall Storybook is an interactive web experience that educates users about the historic 
            Stonewall uprising through engaging storytelling and animation. This project combines historical 
            accuracy with modern web technologies to create an immersive learning experience about this 
            pivotal moment in LGBTQ+ history.
          </p>
        </div>

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

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <FeatureCard
              title="Interactive Animation"
              content="Using GSAP and Framer Motion, the storybook features smooth, responsive animations that bring historical events to life. Each scene is carefully choreographed to enhance the narrative while maintaining historical accuracy."
              emoji="🎬"
            />
            <FeatureCard
              title="Interactive Storytelling"
              content="The story unfolds through an intuitive, choice-based narrative system. Users can explore different perspectives and learn about the events through interactive dialogue and decision points."
              emoji="📖"
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

        <h2>Code Examples</h2>
        <section className="code-snippets-section">
          <div className="code-sections">
            <CodeSnippet
              title="Timeline Animation"
              id="animation"
              code={animationCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Interactive Storytelling Component"
              id="interactive"
              code={interactiveCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Interactive Animation System"
              id="interactiveAnimation"
              code={interactiveAnimationCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Interactive Storytelling Logic"
              id="storytellingLogic"
              code={storytellingLogicCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Responsive Layout System"
              id="responsiveLayout"
              code={responsiveLayoutCode}
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

export default StonewallStorybook; 