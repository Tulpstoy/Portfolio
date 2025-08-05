import React from 'react';
import logo from '../assets/images/logo.png';
import markiplier from '../assets/images/markiplier-dream-daddy.webp';
import danAndPhil from '../assets/images/dan-and-phil.png';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">ABOUT THE GAME</h1>
      </div>
      
      <div className="about-content">
        <div className="streamer-image-container left-image">
          <img src={danAndPhil} alt="Dan and Phil playing Dream Daddy" className="streamer-image" />
        </div>

        <div className="about-text">
          <img src={logo} alt="Dream Daddy Logo" className="about-logo" />
          <p className="history-text">
            Dream Daddy, released in 2017, quickly captured the hearts of gamers worldwide 
            through its unique blend of humor, heart, and inclusive storytelling. The game 
            rose to prominence when major content creators and streamers discovered its 
            charm, making it a beloved fixture of late 2010s gaming culture.
          </p>
          <p className="impact-text">
            What started as a dating simulator became a cultural phenomenon, with prominent 
            YouTubers like Markiplier and Dan & Phil bringing the game to millions of 
            viewers. Their playthroughs highlighted not just the game's comedy, but its 
            thoughtful approach to relationships, family, and community.
          </p>
        </div>

        <div className="quote-section">
          <blockquote className="featured-quote">
            "Dream Daddy became a cult classic by proving that dating sims could be both 
            heartwarming and hilarious, bringing joy to gamers across all communities."
          </blockquote>
        </div>

        <div className="streamer-image-container right-image">
          <img src={markiplier} alt="Markiplier playing Dream Daddy" className="streamer-image" />
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h3>2017</h3>
            <p>Release Year</p>
          </div>
          <div className="stat-item">
            <h3>1M+</h3>
            <p>Players Worldwide</p>
          </div>
          <div className="stat-item">
            <h3>95%</h3>
            <p>Positive Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
