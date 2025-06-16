import React, { useEffect, useState } from 'react';
import './Projects.css';
import ProjectCard from '../global/ProjectCard';
import projectData from '../data/ProjectCards.json';
import TagBar from '../components/TagBar';

const Projects = () => {
  const { projects } = projectData;
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = selectedTag 
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  return (
    <div className="page-container">
      <section className="projects-hero">
        <div className="projects-hero-content">
          <h1>#Projects</h1>
        </div>
      </section>

      <section className="projects-content">
        <div className="projects-intro">
          <h2>What I've Worked On.</h2>
          <h5>I've built a range of front-end projects, with a focus on playful experiences that balance being well-structured and clean.</h5>
        </div>

        <TagBar selectedTag={selectedTag} onTagClick={setSelectedTag} />

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onTagClick={setSelectedTag}  // Pass down
            />
          ))}
        </div>
      </section>

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
