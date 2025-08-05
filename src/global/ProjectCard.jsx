import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project, onTagClick, showTags = true }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Dynamic import for the image based on project ID
        let imageModule;
        switch(project.id) {
          case 1:
            imageModule = await import('../assets/project6/cardimage.png');
            break;
          case 2:
            imageModule = await import('../assets/project5/cardimage.png');
            break;
          case 3:
            imageModule = await import('../assets/project3/cardimage.png');
            break;
          case 4:
            imageModule = await import('../assets/project2/wcd_designoverview.png');
            break;
          case 5:
            imageModule = await import('../assets/project1/Page1.png');
            break;
          case 6:
            imageModule = await import('../assets/project4/cardimage.png');
            break;
          default:
            setImageSrc(null);
            return;
        }
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error('Error loading image:', error);
        setImageSrc(null);
      }
    };

    if (project.id <= 6) {
      loadImage();
    }
  }, [project.id]);

  const handleClick = () => {
    if (project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4 || project.id === 5 || project.id === 6) {
      navigate(`/projects/${project.id}`);
    }
  };

  return (
    <div 
      className={`project-card ${(project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4 || project.id === 5 || project.id === 6) ? 'clickable' : ''}`} 
      onClick={handleClick}
      style={{ cursor: (project.id <= 6) ? 'pointer' : 'default' }}
    >
      <div className="project-image-container">
        {project.id <= 6 && imageSrc ? (
          <img src={imageSrc} alt={project.title} className="project-img" />
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
