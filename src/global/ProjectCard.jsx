import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';
import Page1 from '../assets/project1/Page1.png';
import wcdDesignOverview from '../assets/project2/wcd_designoverview.png';
import poke1 from '../assets/project3/poke1.png';
import stonewall1 from '../assets/project4/stonewall1.png';

const ProjectCard = ({ project, onTagClick, showTags = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4) {
      navigate(`/projects/${project.id}`);
    }
  };

  const getProjectImage = () => {
    switch(project.id) {
      case 1: return Page1;
      case 2: return wcdDesignOverview;
      case 3: return poke1;
      case 4: return stonewall1;
      default: return null;
    }
  };

  return (
    <div 
      className={`project-card ${(project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4) ? 'clickable' : ''}`} 
      onClick={handleClick}
      style={{ cursor: (project.id <= 4) ? 'pointer' : 'default' }}
    >
      <div className="project-image-container">
        {project.id <= 4 ? (
          <img src={getProjectImage()} alt={project.title} className="project-img" />
        ) : (
          <div className="image-placeholder"></div>
        )}
      </div>

      <div className="project-info">
        <h3>{project.title}</h3>
        <span className="project-category">{project.category}</span>
        <p className="project-description">{project.description}</p>

        {showTags && (
          <div className="project-tags">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="project-tag"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
