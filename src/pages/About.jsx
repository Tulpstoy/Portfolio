import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';
import profileImage from '../assets/SquarePortrait.jpg';
import Polaroid from '../components/Building_Blocks/Polaroid';
import ConnectSection from '../components/ProjectComponents/ConnectSection';

const About = () => {
  // Add scroll to top effect at the beginning of the component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = {
    programming: [
      'HTML', 'CSS', 'JavaScript', 'React.js', 'React Native', 
      'Tailwind', 'Bootstrap', 'PHP', 'SQL', 
      'Local Storage', 'REST APIs', 'Node.js'
    ],
    design: [
      'Figma', 'Adobe Photoshop', 'Illustrator', 'InDesign', 
      'After Effects', 'Premiere Pro', 'Audition', 
      'Dimension', 'Substance 3D'
    ],
    cms: ['WordPress', 'Wix', 'Squarespace'],
    other: ['Git & GitHub', 'PHPmyAdmin','Agile/Scrum', 'Jira', 'Trello', 'Slack', 'Microsoft Office', 'Google Workspace']
  };
  

  return (
    <>
      <Helmet>
        <title>About Micah Bron - Developer Portfolio</title>
        <meta name="description" content="Learn more about Micah Bron, a web developer based in Vancouver, BC. Discover my core values, skills, and professional background in design and development." />
        <meta name="keywords" content="Micah Bron, web developer, Vancouver, React, JavaScript, frontend developer, portfolio" />
        <meta property="og:title" content="About Micah Bron - Developer Portfolio" />
        <meta property="og:description" content="Learn more about Micah Bron, a web developer based in Vancouver, BC. Discover my core values, skills, and professional background." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Micah Bron - Developer Portfolio" />
        <meta name="twitter:description" content="Learn more about Micah Bron, a web developer based in Vancouver, BC." />
      </Helmet>
      <div className="about-page">
        <section className="about-hero">
          <div className="moodboard-container">
            {/* Header Section */}
            <div className="moodboard-header">
              <div className="header-content">
                <div className="header-polaroids left-polaroids">
                  <Polaroid id={0} />
                </div>
                <div className="header-text">
                  <h1 className="page-title">Hi, I'm Micah!</h1>
                  <p className="pronouns">(he/him/his)</p>
                  <p className="page-subtitle">I'm just starting out in the world of web development, but I'm a quick learner and a team player and I'm always looking for new challenges.</p>
                  <div className="linkedin-blurb">
                    <a 
                      href="https://www.linkedin.com/in/micah-bron/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="linkedin-link"
                    >
                      <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect with Me Professionally
                    </a>
                  </div>
                  <div className="resume-blurb">
                    <a 
                      href="https://google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="resume-link"
                    >
                      <svg className="resume-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                      My Resume/CV
                    </a>
                  </div>
                </div>
                <div className="header-polaroids right-polaroids">
                  <Polaroid id={1} isRandomPhoto={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>My Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Inclusivity</h3>
              <p>When I say I value inclusivity, I mean it. As someone in the Queer/2SLGBTQIA+ community, I know firsthand how powerful it is to learn from people with different lived experiences. In design and development, that means building a Web that works for everyone — across all abilities and disabilities.</p>
            </div>

            <div className="value-card">
              <h3>Staying Curious</h3>
              <p>Curiosity keeps me moving. It’s what drives me to pick up new skills, ask better questions, and connect with people from all kinds of backgrounds. There’s so much out there to learn — and I try to spend my energy on what challenges, excites, and grows me and my community.</p>
            </div>

            <div className="value-card">
              <h3>Learning How to Be Open</h3>
              <p>Yeah, I was a stubborn kid — and honestly, it still shows up sometimes. But over time, I’ve learned to choose openness. I don’t just aim to be open-minded; I practice it. Being open to new people, perspectives, and feedback has helped me grow across every part of my life and work.</p>
            </div>
          </div>
        </section>

        <section className="timeline-section">
          <h2>Education & Career Timeline</h2>
          <div className="timeline-grid">
            <div className="timeline-card">
              <div className="timeline-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
              </div>
              <div className="timeline-content">
                <h3>B.A. Interdisciplinary Studies</h3>
                <p className="timeline-institution">Trinity Western University (Graduated 2022)</p>
                <p className="timeline-description">Studied interdisciplinary courses galore. Ended with two minors in English and Special Education.</p>
              </div>
            </div>

            <div className="timeline-card">
              <div className="timeline-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>
              </div>
              <div className="timeline-content">
                <h3>Youth Worker</h3>
                <p className="timeline-institution">2021 - 2025</p>
                <p className="timeline-description">Worked as a Youth Worker with 16-19 year olds who were displaced from homes of origin and needed a place to stay. Worked with clients to explore pathways forward.</p>
              </div>
            </div>

            <div className="timeline-card">
              <div className="timeline-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
              </div>
              <div className="timeline-content">
                <h3>New Media Design & Web Development</h3>
                <p className="timeline-institution">BCIT (Expected December 2025)</p>
                <p className="timeline-description">Currently studying Web Development and New Media Design.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-me-section">
          <h2>About Me</h2>
          <div className="about-card">
            <p>I studied Interdisciplinary Studies at Trinity Western University, a fairly conservative Christian school. As a queer person navigating that space, I learned a lot about critical thinking, creative resilience, and how to grow in environments that don’t always feel welcoming.</p>
            <p>After graduation, I worked in youth programs and social services. Supporting people and communities brought a sense of spiritual fulfillment that still influences how I approach design and development today.</p>
            <p>I decided to return to school to study Web Development at BCIT. I genuinely love solving problems. Even when they’re frustrating (which, let’s be honest, they usually are). There’s nothing quite like the moment when something finally works. Whether I’m debugging code or figuring out a more accessible user flow, I get a real kick out of seeing solutions come to life. Lately, I’ve noticed how often simple answers are the smartest ones.</p>
          </div>
        </section>

        <section className="skills-section">
          <h2>My Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Programming Languages & Libraries</h3>
              <div className="skills-tags">
                {skills.programming.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-card">
              <h3>Design Software</h3>
              <div className="skills-tags">
                {skills.design.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-card">
              <h3>Content Management Systems & Other</h3>
              <div className="skills-tags">
                {skills.cms.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
                {skills.other.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ConnectSection />
      </div>
    </>
  );
};

export default About;