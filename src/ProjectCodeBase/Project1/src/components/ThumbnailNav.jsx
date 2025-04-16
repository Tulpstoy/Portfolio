import React from 'react';
import './ThumbnailNav.css';

const ThumbnailNav = ({ thumbnails, activeIndex, onClick }) => {
  return (
    <div className="thumbnail-nav">
      <div className="thumbnail-strip">
        {thumbnails.map((thumbnail, index) => (
          <div 
            key={index} 
            className={`thumbnail-wrapper ${activeIndex === index ? 'active' : ''}`}
            onClick={() => onClick(index)}
          >
            <img
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailNav;