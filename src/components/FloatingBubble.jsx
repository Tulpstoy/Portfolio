import React, { useState, useMemo } from 'react';
import './FloatingBubble.css';

const FloatingBubble = ({ imageUrl, initialPosition, delay }) => {
  const [isPopped, setIsPopped] = useState(false);
  
  // Generate a random size between 60px and 100px
  const randomSize = useMemo(() => {
    return Math.floor(Math.random() * (100 - 60 + 1) + 60);
  }, []);

  const handlePop = () => {
    setIsPopped(true);
  };

  if (isPopped) return null;

  return (
    <div 
      className="floating-bubble"
      style={{
        '--delay': `${delay}s`,
        '--initialX': `${initialPosition.x}px`,
        '--initialY': `${initialPosition.y}px`,
        width: `${randomSize}px`,
        height: `${randomSize}px`
      }}
      onClick={handlePop}
    >
      <img src={imageUrl} alt="Floating bubble" />
    </div>
  );
};

export default FloatingBubble; 