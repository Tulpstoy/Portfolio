import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';
import profileImage from '../assets/SquarePortrait.webp';
import Polaroid from '../components/Building_Blocks/Polaroid';

const About = () => {
  // Add scroll to top effect at the beginning of the component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = {
    programming: ['HTML', 'CSS', 'JavaScript', 'React.js', 'React Native', 'Tailwind', 'Bootstrap'],
    design: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Premier Pro', 'Audition', 'Dimension', 'Substance', 'Figma'],
    cms: ['WordPress', 'Wix', 'Squarespace']
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
                  <p className="page-subtitle">Discovering who I am beyond the code</p>
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
          <h2>My Core Values.</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Inclusivity</h3>
              <p>When I say I value "inclusivity", it's not just a buzz-word. I genuinely mean it. As a member of the Queer/2SLGBTQIA+ community, I've seen the value of learning from people who are different than us. In the world of design and development, I also feel passionate about how to make the Web more inclusive to those with different abilities and disabilities.</p>
            </div>

            <div className="value-card">
              <h3>Staying Curious</h3>
              <p>To me, the act of staying curious enables me to feel passion about learning new skills and to hear stories from new people about new things. There is so much information out there in the world, and with us having limited time and energy, I want to make sure I pour my time and energy into things that enrich my life, my brain and my community.</p>
            </div>

            <div className="value-card">
              <h3>Learning How to Be Open</h3>
              <p>As a kid, I sometimes got told I have a stubborn streak. There is absolutely something deeply beautiful about those who know what they like. But as I've gotten older, I've found the value of striving to be more open and to be open to learning things from people from all walks of life. I would love to say that I'm Open Minded. And I probably am. But I think more so I choose to be open as a conscious act every day. Learning from people from all walks of life has enabled me to learn new perspectives in new skills, and has kept my skills sharp in a variety of fields.</p>
            </div>
          </div>
        </section>

        <section className="about-me-section">
          <h2>About Me.</h2>
          <div className="about-card">
            <p>Hi! I'm Micah, and I'm a Web Developer currently based in Vancouver, BC. I have a history in Social Services and bring that interest in serving communities to the world of Design and Development.</p>
            <p>I love solving problems and learning anything and everything. One of my greatest joys is the feeling of figuring out a problem in code and seeing the results work in real-time. I've loved integrating solutions in HTML, CSS and JavaScript and am currently learning React and React Native. I always love learning new technologies to create dynamic (and often simple) solutions to seemingly complex problems.</p>
            <p>In my free-time I enjoy writing and storytelling, and enjoy the feeling of completing works after putting in long periods of work. Indeed, the feeling of completing things after often hard journeys to their finish is something that drives me.</p>
          </div>
        </section>

        <section className="skills-section">
          <h2>My Skills.</h2>
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
              <h3>Content Management Systems</h3>
              <div className="skills-tags">
                {skills.cms.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

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
    </>
  );
};

export default About;