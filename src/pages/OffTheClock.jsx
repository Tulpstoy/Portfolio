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
                When I'm not coding, here's what I'm up to and how it shapes my approach to development.
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
            Beyond the code, I'm someone who believes that our personal interests and experiences 
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
              <p>I believe in being genuine in my work and relationships, creating experiences that reflect real needs and values.</p>
            </div>
            <div className="value-card">
              <h3 className="value-title">Community</h3>
              <p>I value building connections and supporting others, whether in development communities or personal relationships.</p>
            </div>
            <div className="value-card">
              <h3 className="value-title">Growth</h3>
              <p>I'm always learning and evolving, both personally and professionally, embracing challenges as opportunities.</p>
            </div>
          </div>
        </section>

        {/* Polaroids between Values and Writing */}
        {createPolaroidRow(6)}

        <section className="writing-section">
          <h2 className="section-title"><span className="emoji">📚</span> Writer & Reader</h2>
          <p>
            I love to write and read. Whether it's creative writing, technical documentation, 
            or diving into a good book, I find that storytelling and clear communication are 
            essential skills in development. Every piece of code tells a story, and I believe 
            in making that story accessible and engaging for users.
          </p>
          <p>
            My reading spans from fiction to technical books, and I find that this diversity 
            helps me think creatively about problem-solving and user experience design.
          </p>
        </section>

        {/* Polaroids between Writing and Sims */}
        {createPolaroidRow(10)}

        <section className="sims-section">
          <h2 className="section-title"><span className="emoji">🎮</span> The Sims & My Journey</h2>
          <p>
            I've been playing The Sims since I was a kid, and it's more than just a game to me. 
            It's where I first learned about user interface design, user experience, and the 
            importance of creating intuitive, enjoyable experiences for users.
          </p>
          <p>
            The Sims taught me about building systems, managing complexity, and creating 
            interfaces that feel natural and engaging. These lessons directly influence how 
            I approach web development today.
          </p>
        </section>

        {/* Polaroids between Sims and Development */}
        {createPolaroidRow(14)}

        <section className="development-section">
          <h2 className="section-title"><span className="emoji">💡</span> From Sims to Code</h2>
          <p>
            My journey from playing The Sims to becoming a developer wasn't a straight line, 
            but it makes perfect sense to me. Both involve creating systems, solving problems, 
            and thinking about how users interact with interfaces.
          </p>
          <p>
            The attention to detail, the focus on user experience, and the joy of creating 
            something that others can use and enjoy - these are the threads that connect my 
            personal interests to my professional work.
          </p>
        </section>

        {/* Polaroids between Development and Cats */}
        {createPolaroidRow(18)}

        <section className="cats-section">
          <h2 className="section-title"><span className="emoji">🐱</span> My Furry Companions</h2>
          <p>
            I have cats, and they're a constant reminder of the importance of patience, 
            observation, and understanding different perspectives. They also provide excellent 
            debugging companionship - there's nothing like explaining a problem to a cat to 
            help you think through it clearly!
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