import React from 'react';
import '../ProjectComponents/FeatureCard.css';

const FeatureCard = ({ title, content, emoji }) => {
  console.log('FeatureCard props:', { title, content, emoji });

  return (
    <div className="feature-card static">
      {emoji && <div className="feature-icon-bg feature-card-emoji">{emoji}</div>}
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{content}</p>
    </div>
  );
};

export default FeatureCard;
