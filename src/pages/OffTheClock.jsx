import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './OffTheClock.css';
import profileImage from '../assets/SquarePortrait.webp';
import ConnectSection from '../components/ProjectComponents/ConnectSection';
import Polaroid, { createPolaroidRow } from '../components/Building_Blocks/Polaroid';

const OffTheClock = () => {
  // Add scroll to top effect at the beginning of the component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Off The Clock - Micah Bron Portfolio</title>
        <meta name="description" content="A peek into my world beyond code. Learn about my life as a writer, reader, Sims enthusiast, and cat parent in Vancouver, BC." />
        <meta name="keywords" content="Micah Bron, personal life, writer, reader, Sims, cats, Vancouver, queer literature, storytelling" />
        <meta property="og:title" content="Off The Clock - Micah Bron Portfolio" />
        <meta property="og:description" content="A peek into my world beyond code. Learn about my life as a writer, reader, Sims enthusiast, and cat parent." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/off-the-clock" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Off The Clock - Micah Bron Portfolio" />
        <meta name="twitter:description" content="A peek into my world beyond code. Learn about my life as a writer, reader, Sims enthusiast, and cat parent." />
      </Helmet>
      <div className="off-the-clock-page">
        <div className="moodboard-container">
          {/* Header Section */}
          <div className="moodboard-header">
            <div className="header-content">
              <div className="header-polaroids left-polaroids">
                <Polaroid id={0} />
              </div>
              <div className="header-text">
                <h1 className="page-title">Off the Clock</h1>
                <p className="page-subtitle">A peek into my world beyond code</p>
                <div className="instagram-blurb">
                  <a 
                    href="https://www.instagram.com/tulpstoy/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    a glimpse into me irl
                  </a>
                </div>
              </div>
              <div className="header-polaroids right-polaroids">
                <Polaroid id={1} isRandomPhoto={true} />
              </div>
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="info-card personal-info">
            <h2 className="section-title">Hi, I'm Micah! 👋</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Myers-Briggs:</span>
                <span className="value">ENFP/INFP</span>
              </div>
              <div className="info-item">
                <span className="label">Enneagram:</span>
                <span className="value">1w2</span>
              </div>
              <div className="info-item">
                <span className="label">Location:</span>
                <span className="value">Vancouver, BC</span>
              </div>
              <div className="info-item">
                <span className="label">Fur Babies:</span>
                <span className="value">2 cats 🐱🐱</span>
              </div>
            </div>
          </div>

          {/* Polaroids above Writing Section */}
          {createPolaroidRow(2, 0)}

          {/* Writing Section */}
          <div className="content-card writing-section">
            <h2 className="section-title"><span className="emoji">📚</span> Writer & Reader</h2>
            <p className="content-text">
              I'm a hobbyist writer who self-publishes queer romance books. There's something magical about crafting stories that represent the LGBTQ+ community and exploring the complexities of love and identity. When I'm not writing, you'll find me buried in books - queer literature, sci-fi, and anything that challenges my perspective.
            </p>
            <div className="book-emoji">📖 ✍️ 🌈</div>
          </div>

          {/* Polaroids below Writing Section */}
          {createPolaroidRow(6, 4)}

          {/* The Sims Section */}
          <div className="content-card sims-section">
            <h2 className="section-title"><span className="emoji">🎮</span> The Sims & My Journey</h2>
            <p className="content-text">
              Growing up, The Sims was my ultimate sandbox - a world where I could create stories, build communities, and experiment with endless possibilities. It wasn't just a game; it was my first introduction to both storytelling and development through modding. Custom content creation taught me about user experience, design principles, and the joy of building something that others could enjoy.
            </p>
            <p className="content-text">
              Those hours spent creating mods, designing houses, and crafting character backstories were my first steps into the worlds of development and narrative design. The Sims showed me that technology could be a canvas for creativity and storytelling - a lesson that still drives my work today.
            </p>
            <div className="sims-emoji">🏠 👥 🎨</div>
          </div>

          {/* Polaroids below Sims Section */}
          {createPolaroidRow(10, 8)}

          {/* Development Connection */}
          <div className="content-card connection-section">
            <h2 className="section-title"><span className="emoji">💡</span> From Sims to Code</h2>
            <p className="content-text">
              The connection between my childhood love for The Sims and my current passion for development is clear: both are about creating meaningful experiences for people. Just as I once crafted stories and built worlds in The Sims, I now build digital experiences that connect, inspire, and serve communities.
            </p>
            <p className="content-text">
              My background in social services, combined with my love for storytelling and technology, has shaped my approach to development. I believe in creating inclusive, accessible, and human-centered digital experiences that reflect the diversity of our world.
            </p>
            <div className="connection-emoji">🚀 💻 ❤️</div>
          </div>

          {/* Polaroids below Development Section */}
          {createPolaroidRow(14)}

          {/* Cats Section */}
          <div className="content-card cats-section">
            <h2 className="section-title"><span className="emoji">🐱</span> My Furry Companions</h2>
            <p className="content-text">
              I have two cats who are my constant companions during coding sessions and writing marathons. They're my best critics (always walking across my keyboard at the perfect moment) and my biggest supporters. There's nothing like a purring cat to help you debug code or find the right words for a story.
            </p>
            <div className="cats-emoji">🐱🐱 💕</div>
          </div>

          {/* Polaroids below Cats Section */}
          {createPolaroidRow(18)}

          {/* Values Section */}
          <div className="content-card drives-section">
            <h2 className="section-title"><span className="emoji">✨</span> What Drives Me</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3 className="value-title">Authenticity</h3>
                <p className="value-text">Being genuine in everything I do, from code to stories to relationships.</p>
              </div>
              <div className="value-item">
                <h3 className="value-title">Community</h3>
                <p className="value-text">Building connections and supporting others in their journeys.</p>
              </div>
              <div className="value-item">
                <h3 className="value-title">Growth</h3>
                <p className="value-text">Always learning, always evolving, always curious about new perspectives.</p>
              </div>
            </div>
          </div>

          {/* Polaroids below Values Section */}
          {createPolaroidRow(22)}

          {/* Connect Section */}
          <ConnectSection />
        </div>
      </div>
    </>
  );
};

export default OffTheClock; 