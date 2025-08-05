import React from 'react';
import '../styles/BachelorInfo.css';

const BachelorInfo = ({ name, bio }) => {
  return (
    <div className="bachelor-info">
      <h2 className="bachelor-name">{name}</h2>
      <p className="bachelor-bio">{bio}</p>
    </div>
  );
};

export default BachelorInfo; 