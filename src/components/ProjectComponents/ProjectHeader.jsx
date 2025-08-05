import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../ProjectComponents/ProjectHeader.css'; 

const ProjectHeader = ({ title, emojis, category, tags, liveLink, githubLink }) => (
  <div className="project-header">
    <div className="project-title-section">
      <h1>
        <span className="gradient-text">{title}</span>
        <span className="title-emojis">{emojis}</span>
      </h1>
      <h3 className="project-category">{category}</h3>
    </div>

    <div className="project-skills-wrapper">
    <h3 className="project-skills-heading">Project Skills</h3>
    <div className="project-skills-card">
        {tags.map((tag, index) => (
        <span key={index} className="project-skill-tag">{tag}</span>
        ))}
    </div>
    </div>

    <div className="project-actions">
      {liveLink && <a href={liveLink} target="_blank" rel="noopener noreferrer" className="live-demo">View Live Demo</a>}
      {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="github"><FaGithub /> View on GitHub</a>}
    </div>
  </div>
);

export default ProjectHeader;
