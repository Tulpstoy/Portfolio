import React, { useEffect } from 'react';
import './About.css';
import profileImage from '../assets/SquarePortrait.webp';
import FloatingBubble from '../components/FloatingBubble';
import Photo1 from '../assets/InstagramPhotos/photo1.jpeg';
import Photo2 from '../assets/InstagramPhotos/photo2.jpeg';
import Photo3 from '../assets/InstagramPhotos/photo3.jpg';
import Photo4 from '../assets/InstagramPhotos/photo4.jpg';
import Photo5 from '../assets/InstagramPhotos/photo5.jpg';
import Photo6 from '../assets/InstagramPhotos/photo6.jpg';
import Photo7 from '../assets/InstagramPhotos/photo7.jpg';
import Photo8 from '../assets/InstagramPhotos/photo8.jpg';
import Photo9 from '../assets/InstagramPhotos/photo9.jpg';
import Photo10 from '../assets/InstagramPhotos/photo10.jpg';
import Photo11 from '../assets/InstagramPhotos/photo11.jpg';

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

  const getRandomPosition = (isLeft, existingPositions) => {
    // Safe zones for bubbles - default (desktop)
    const zones = {
      desktop: {
        left: {
          minX: 20,
          maxX: 200,
          minY: 40,
          maxY: 500
        },
        right: {
          minX: 880,
          maxX: 1000,
          minY: 40,
          maxY: 500
        }
      },
      tablet: {
        left: {
          minX: 20,
          maxX: 150,
          minY: 40,
          maxY: 400
        },
        right: {
          minX: 580,
          maxX: 700,
          minY: 40,
          maxY: 400
        }
      },
      mobile: {
        left: {
          minX: 10,
          maxX: 100,
          minY: 40,
          maxY: 300
        },
        right: {
          minX: 280,
          maxX: 350,
          minY: 40,
          maxY: 300
        }
      }
    };

    // Get current window width
    const width = window.innerWidth;
    let currentZones;

    // Determine which zones to use based on screen size
    if (width <= 480) {
      currentZones = zones.mobile;
    } else if (width <= 768) {
      currentZones = zones.tablet;
    } else {
      currentZones = zones.desktop;
    }

    const zone = isLeft ? currentZones.left : currentZones.right;
    
    // Try up to 50 times to find a valid position
    for (let attempts = 0; attempts < 50; attempts++) {
      const newPos = {
        x: Math.floor(Math.random() * (zone.maxX - zone.minX + 1)) + zone.minX,
        y: Math.floor(Math.random() * (zone.maxY - zone.minY + 1)) + zone.minY
      };

      // Adjust buffer size based on screen width
      const bufferSize = width <= 480 ? 40 : width <= 768 ? 60 : 80;

      // Check if this position is far enough from all existing positions
      const isFarEnough = existingPositions.every(pos => {
        const distance = Math.sqrt(
          Math.pow(newPos.x - pos.x, 2) + 
          Math.pow(newPos.y - pos.y, 2)
        );
        return distance >= bufferSize;
      });

      if (isFarEnough || attempts === 49) {
        return newPos;
      }
    }
  };

  // Generate positions with collision detection
  const generateBubblePositions = () => {
    const positions = [];
    
    // Generate 5 left side positions
    for (let i = 0; i < 5; i++) {
      positions.push(getRandomPosition(true, positions));
    }
    
    // Generate 6 right side positions
    for (let i = 0; i < 6; i++) {
      positions.push(getRandomPosition(false, positions));
    }
    
    return positions;
  };

  const bubblePositions = generateBubblePositions();
  const photos = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6, Photo7, Photo8, Photo9, Photo10, Photo11];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="floating-bubbles-container">
          {photos.map((photo, index) => (
            <FloatingBubble
              key={index}
              imageUrl={photo}
              initialPosition={bubblePositions[index]}
              delay={index * 0.3}
            />
          ))}
        </div>
        <div className="profile-container">
          <img src={profileImage} alt="Micah Bron" className="profile-image" />
        </div>
        <div className="about-content">
          <h1>Hi, I'm Micah.</h1>
          <div className="taglines">
            <p>I'm a <span className="bold-text">Fast-Learner</span>.</p>
            <p>I'm <span className="bold-text">Always Curious</span>.</p>
            <p>I Believe <span className="bold-text">Inclusivity Helps Us All</span>.</p>
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
  );
};

export default About;