import React from 'react';
import { Helmet } from 'react-helmet-async';
import Polaroid, { createPolaroidRow } from '../components/Building_Blocks/Polaroid';
import ConnectSection from '../components/ProjectComponents/ConnectSection';
import './OffTheClock.css';

const OffTheClock = () => {
  return (
    <>
      <Helmet>
        <title>Off The Clock - Micah Bron Portfolio</title>
        <meta name="description" content="Discover what Micah Bron does when not coding - from writing and reading to playing The Sims, and how these interests shape his development approach." />
        <meta name="keywords" content="personal interests, writing, reading, The Sims, development journey, Vancouver developer" />
        <meta property="og:title" content="Off The Clock - Micah Bron Portfolio" />
        <meta property="og:description" content="Discover what Micah Bron does when not coding - from writing and reading to playing The Sims, and how these interests shape his development approach." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/off-the-clock" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Off The Clock - Micah Bron Portfolio" />
        <meta name="twitter:description" content="Discover what Micah Bron does when not coding - from writing and reading to playing The Sims, and how these interests shape my development approach." />
      </Helmet>
      <div className="page-container">
        <section className="hero-section">
          <div className="hero-content">
            <div className="header-polaroids left-polaroids">
              <Polaroid id={0} />
            </div>
            <div className="hero-text">
              <h1 className="page-title">Off the Clock</h1>
              <p className="hero-description">
                When I'm not working on projects, here's what I'm up to.
              </p>
            </div>
            <div className="header-polaroids right-polaroids">
              <Polaroid id={1} isRandomPhoto={true} />
            </div>
          </div>
        </section>

        <section className="intro-section">
          <h2 className="section-title">Hi, I'm Micah! <span className="emoji">👋🏻</span></h2>
          <p>
            Beyond the code, I'm a queer young adult who loves reading, writing, and storytelling. I'm also a cat person and a gamer. I'm someone who believes that our personal interests and experiences 
            deeply influence how we approach problems and create solutions. Here's a glimpse into 
            what drives me and how it connects to my development work.
          </p>
        </section>

        {/* Polaroids between Intro and Values */}
        {createPolaroidRow(2)}

        <section className="values-section">
          <h2 className="section-title"><span className="emoji">✨</span> What Drives Me</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title">Authenticity</h3>
              <p>I believe in being genuine in my work and relationships, creating experiences that reflect real needs and values. This often leads to silly playful moments or projects marred by perfectionism, depending on the day. I'm versatile in my approach and can do both approaches.</p>
            </div>
            <div className="value-card">
              <h3 className="value-title">Community</h3>
              <p>I value building connections and supporting others, whether in development communities or personal relationships. I love creating safe spaces for people to be themselves and to grow, and participating in safe communities. I love what happens when brains get together and create some cool stuff.</p>
            </div>
            <div className="value-card">
              <h3 className="value-title">Growth</h3>
              <p>I'm always learning and evolving, both personally and professionally, embracing challenges as opportunities. If you didn't find the you of a year ago to be super cringe, are you even succeeding at life?</p>
            </div>
          </div>
        </section>

        {/* Polaroids between Values and Writing */}
        {createPolaroidRow(6)}

        <section className="writing-section">
          <h2 className="section-title"><span className="emoji">📚</span> Writer & Reader</h2>
            <p>
            I write queer fiction and romance — the kinds of stories I wish I'd had growing up. Telling those stories now has been healing in ways I didn’t expect, and wildly fun in the best ways. As an adult, discovering that the limit doesn’t exist when it comes to whose stories get told has opened up a whole new creative world.
            </p>
            <p>
            Reading and writing have both deeply shaped how I think, build, and create across disciplines. Whether I’m writing code, designing interfaces, or developing content, I always come back to storytelling — it’s at the heart of clarity, empathy, and good design.
            </p>
        </section>

        {/* Polaroids between Writing and Sims */}
        {createPolaroidRow(10)}

        <section className="sims-section">
          <h2 className="section-title"><span className="emoji">🎮</span> The Sims & My Journey</h2>
          <p>
          Growing up, The Sims was more than just a game—it was a safe sandbox where I could explore, experiment, and create without judgment. 
          It gave me space to tell stories, test ideas, and build whole worlds on my own terms.
          </p>
          <p>
          Through The Sims, I naturally found my way into both storytelling and systems thinking—two things I’ve been consistently drawn back to as an adult. 
          Whether I'm designing user interfaces or writing interactive narratives, the lessons I learned in that sandbox still guide my creative and development work today.
          </p>
        </section>

        {/* Polaroids between Sims and Development */}
        {createPolaroidRow(14)}

        <section className="development-section">
          <h2 className="section-title"><span className="emoji">💡</span> Designing with Empathy</h2>
            <p>
            Before I ever touched a line of code, I worked in social services—supporting youth, navigating complex systems, and learning how to listen deeply. 
            I also grew up with a disabled sibling, and as a teenager, I wrestled with my own learning disabilities. These experiences shaped how I see the world—and how I build within it.
            </p>
            <p>
            They’re what drew me to psychology, to systems thinking, and eventually to accessible design and development. 
            I believe technology should meet people where they are—whether that means designing with empathy, simplifying complexity, 
            or making sure no one is left out of the experience. For me, development isn’t just technical—it’s personal.
            </p>
</section>


        {/* Polaroids between Development and Cats */}
        {createPolaroidRow(18)}

        <section className="cats-section">
          <h2 className="section-title"><span className="emoji">🐱</span> My Furry Companions</h2>
          <p>
            I have two fur babies, and they're a constant reminder of the importance of patience, 
            observation, and understanding different perspectives. They also provide excellent 
            companionship during frustrating moments of debugging. Strongly recommend.
          </p>
        </section>

        {/* Polaroids between Cats and Connect */}
        {createPolaroidRow(22)}

        <ConnectSection />
      </div>
    </>
  );
};

export default OffTheClock; 