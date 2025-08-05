import React from 'react';
import './Polaroid.css';
import polaroidData from '../../data/polaroid.json';

// Import all photo assets
import Photo1 from '../../assets/InstagramPhotos/photo1.jpeg';
import Photo2 from '../../assets/InstagramPhotos/photo2.jpeg';
import Photo3 from '../../assets/InstagramPhotos/photo3.jpg';
import Photo4 from '../../assets/InstagramPhotos/photo4.jpg';
import Photo5 from '../../assets/InstagramPhotos/photo5.jpg';
import Photo6 from '../../assets/InstagramPhotos/photo6.jpg';
import Photo7 from '../../assets/InstagramPhotos/photo7.jpg';
import Photo8 from '../../assets/InstagramPhotos/photo8.jpg';
import Photo9 from '../../assets/InstagramPhotos/photo9.jpg';
import Photo10 from '../../assets/InstagramPhotos/photo10.jpg';
import Photo11 from '../../assets/InstagramPhotos/photo11.jpg';
import ProfileImage from '../../assets/SquarePortrait.webp';

const Polaroid = ({ id, photoIndex = null, className = "", isRandomPhoto = false }) => {
  const { polaroids, instagramPhotos } = polaroidData;
  
  // Find the polaroid data by ID
  const polaroid = polaroids.find(p => p.id === id) || polaroids[id % polaroids.length];
  const isPlaceholder = photoIndex === null || photoIndex >= instagramPhotos.length;
  const isProfile = polaroid.isProfile;
  
  // Create photos array from instagramPhotos data
  const photos = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6, Photo7, Photo8, Photo9, Photo10, Photo11];
  
  // Get the Instagram photo data if using a photo
  const instagramPhoto = photoIndex !== null && photoIndex < instagramPhotos.length 
    ? instagramPhotos[photoIndex] 
    : null;
  
  // For random photo selection, pick a random Instagram photo
  const randomPhotoIndex = isRandomPhoto ? Math.floor(Math.random() * instagramPhotos.length) : null;
  const randomPhoto = isRandomPhoto ? instagramPhotos[randomPhotoIndex] : null;
  
  return (
    <div 
      className={`polaroid-frame ${className}`} 
      style={{ 
        transform: `rotate(${(id % 4 - 1.5) * 3}deg)`,
        zIndex: id + 1
      }}
    >
      <div className="polaroid-photo">
        {isProfile ? (
          <img src={ProfileImage} alt="Micah Bron profile photo" />
        ) : isRandomPhoto ? (
          <img src={photos[randomPhotoIndex]} alt={`Life moment ${randomPhotoIndex + 1}`} />
        ) : isPlaceholder ? (
          <div className="placeholder-photo">
            <span className="placeholder-emoji">{polaroid.emoji}</span>
          </div>
        ) : (
          <img src={photos[photoIndex]} alt={`Life moment ${photoIndex + 1}`} />
        )}
      </div>
      <div className="polaroid-label">
        {isProfile ? `${polaroid.emoji} ${polaroid.text}` : 
         isRandomPhoto ? `${randomPhoto.emoji} ${randomPhoto.text}` :
         isPlaceholder ? `${polaroid.emoji} ${polaroid.text}` : 
         instagramPhoto ? `${instagramPhoto.emoji} ${instagramPhoto.text}` : `${polaroid.emoji} ${polaroid.text}`}
      </div>
    </div>
  );
};

// Function to create a row of 4 polaroids (used in OffTheClock page)
export const createPolaroidRow = (startId, photoStartIndex = null) => {
  return (
    <div className="polaroid-grid">
      {Array.from({ length: 4 }, (_, i) => {
        const currentId = startId + i;
        const photoIndex = photoStartIndex !== null ? photoStartIndex + i : null;
        return (
          <Polaroid 
            key={currentId}
            id={currentId} 
            photoIndex={photoIndex} 
          />
        );
      })}
    </div>
  );
};

export default Polaroid;
