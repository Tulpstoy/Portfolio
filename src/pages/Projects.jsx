import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Projects.css';
import ProjectCard from '../global/ProjectCard';
import projectData from '../data/ProjectCards.json';
import TagBar from '../components/TagBar';
import ConnectSection from '../components/ProjectComponents/ConnectSection';

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
    <>
      <Helmet>
        <title>Projects - Micah Bron Portfolio</title>
        <meta name="description" content="Explore my front-end projects showcasing playful experiences that balance being well-structured and clean. View my work in React, JavaScript, and modern web development." />
        <meta name="keywords" content="projects, portfolio, React, JavaScript, frontend development, web development, Vancouver developer" />
        <meta property="og:title" content="Projects - Micah Bron Portfolio" />
        <meta property="og:description" content="Explore my front-end projects showcasing playful experiences that balance being well-structured and clean." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects - Micah Bron Portfolio" />
        <meta name="twitter:description" content="Explore my front-end projects showcasing playful experiences that balance being well-structured and clean." />
      </Helmet>
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

        <ConnectSection />
      </div>
    </>
  );
};

export default Projects;
