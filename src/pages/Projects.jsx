import React, { useEffect } from 'react';
import './Projects.css';
import ProjectCard from '../global/ProjectCard';
import projectData from '../data/ProjectCards.json';

const Projects = () => {
  const { projects } = projectData;

  // Add scroll to top effect at the beginning of the component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projects-page">
      {/* Hero Section with Gradient Background */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <h1>Projects</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="projects-content">
        <div className="projects-intro">
          <h2>What I've Worked On.</h2>
          <p>I've built a range of front-end projects, with a focus on playful experiences that balance being well-structured and clean. Feel free to click on any of the cards below that interest you.</p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <div className="connect-content">
          <h2>Connect With Me.</h2>
          <p>Let's work together to bring your ideas to life.</p>
          <div className="email-container">
            <span className="email">micah.bron@icloud.com</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects; 