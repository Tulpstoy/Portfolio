import React from 'react';
import './StudioDisplayPlayer.css';

const StudioDisplayPlayer = ({ videoSrc }) => {
  return (
    <div className="video-display-wrapper">
      <svg className="studio-frame-svg" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF0080" /> 
          <stop offset="100%" stopColor="#FF8C00" /> 
        </linearGradient>
        </defs>
        <g fill="url(#monitorGradient)">
          <path d="M454.2,611H347v2.8h107.2V611z" />
          <path d="M370.9,614.8v1.4c0,0.8-0.7,1.5-1.5,1.5h-20.8c-0.8,0-1.5-0.7-1.5-1.5v-1.4H370.9z" />
          <path d="M454.2,614.8v1.4c0,0.8-0.7,1.5-1.5,1.5H432c-0.8,0-1.5-0.7-1.5-1.5v-1.4H454.2z" />
          <path d="M665,181.4H135.2c-4.2,0-7.7,3.4-7.7,7.7v309.4c0,4.2,3.5,7.7,7.7,7.7h210.9v107.6v2.4c0,1.4,1.1,2.5,2.5,2.5
            h20.8c1.4,0,2.5-1.1,2.5-2.5v-1.4h57.5v1.4c0,1.4,1.1,2.5,2.5,2.5h20.8c1.4,0,2.5-1.1,2.5-2.5v-110h209.7c4.2,0,7.7-3.4,7.7-7.7
            V189.1C672.7,184.8,669.2,181.4,665,181.4z" />
          <path d="M454.2,506.1V610H347V506.1h35.1c0.2,2.8,2,16.4,18.5,16.4s18.3-13.6,18.5-16.4H454.2z" />
          <path d="M665,182.4H135.2c-3.7,0-6.7,3-6.7,6.7v309.4c0,3.7,3,6.7,6.7,6.7h529.7c3.7,0,6.7-3,6.7-6.7V189.1
            C671.7,185.4,668.7,182.4,665,182.4z M654.5,490.1h-509V197.4h509V490.1z" />
          <path d="M145.6,197.4v292.9h509V197.4H145.6z M653.5,489.1h-507V198.4h507V489.1z" />
        </g>
        <g>
          <rect x="145.5" y="198.4" width="507" height="290.9" fill="#FFFFFF" />
        </g>
      </svg>

      <div className="video-inside-screen">
        <video controls playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default StudioDisplayPlayer;
