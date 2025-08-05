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
import Photo12 from '../../assets/InstagramPhotos/photo12.jpg';
import Photo13 from '../../assets/InstagramPhotos/photo13.jpg';
import Photo14 from '../../assets/InstagramPhotos/photo14.jpg';
import Photo15 from '../../assets/InstagramPhotos/photo15.jpg';
import Photo16 from '../../assets/InstagramPhotos/photo16.jpg';
import Photo17 from '../../assets/InstagramPhotos/photo17.jpg';
import Photo18 from '../../assets/InstagramPhotos/photo18.jpg';
import Photo19 from '../../assets/InstagramPhotos/photo19.jpg';
import Photo20 from '../../assets/InstagramPhotos/photo20.jpg';
import Photo21 from '../../assets/InstagramPhotos/photo21.jpg';
import Photo22 from '../../assets/InstagramPhotos/photo22.jpg';
import Photo23 from '../../assets/InstagramPhotos/photo23.jpg';
import Photo24 from '../../assets/InstagramPhotos/photo24.jpg';
import Photo25 from '../../assets/InstagramPhotos/photo25.jpg';
import Photo26 from '../../assets/InstagramPhotos/photo26.jpg';
import Photo27 from '../../assets/InstagramPhotos/photo27.jpg';
import Photo28 from '../../assets/InstagramPhotos/photo28.jpg';
import Photo29 from '../../assets/InstagramPhotos/photo29.jpg';


import ProfileImage from '../../assets/SquarePortrait.jpg';

const Polaroid = ({ id, photoIndex = null, className = "", isRandomPhoto = false }) => {
  const { polaroids, instagramPhotos } = polaroidData;
  
  // Find the polaroid data by ID
  const polaroid = polaroids.find(p => p.id === id) || polaroids[id % polaroids.length];
  const isPlaceholder = photoIndex === null || photoIndex >= instagramPhotos.length;
  const isProfile = polaroid.isProfile;
  
  // Create photos array from instagramPhotos data
  const photos = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6, Photo7, Photo8, Photo9, Photo10, Photo11, Photo12, Photo13, Photo14, Photo15, Photo16, Photo17, Photo18, Photo19, Photo20, Photo21, Photo22, Photo23, Photo24, Photo25, Photo26, Photo27, Photo28, Photo29];
  
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

// Track used photo indices to prevent duplicates
let usedPhotoIndices = new Set();

// Function to get a random unused photo index
const getRandomUnusedPhotoIndex = () => {
  const availableIndices = [];
  // Start from 1 to exclude the profile photo (ID 0)
  for (let i = 1; i < 29; i++) {
    if (!usedPhotoIndices.has(i)) {
      availableIndices.push(i);
    }
  }
  
  // If all photos have been used, reset the set (excluding profile photo)
  if (availableIndices.length === 0) {
    usedPhotoIndices.clear();
    for (let i = 1; i < 29; i++) {
      availableIndices.push(i);
    }
  }
  
  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  const selectedIndex = availableIndices[randomIndex];
  usedPhotoIndices.add(selectedIndex);
  return selectedIndex;
};

// Function to create a row of 4 polaroids (used in OffTheClock page)
export const createPolaroidRow = (startId, photoStartIndex = null) => {
  return (
    <div className="polaroid-row-container">
      {Array.from({ length: 4 }, (_, i) => {
        const currentId = startId + i;
        // Use unique photo selection to prevent duplicates
        const uniquePhotoIndex = getRandomUnusedPhotoIndex();
        return (
          <Polaroid 
            key={currentId}
            id={currentId} 
            photoIndex={uniquePhotoIndex} 
          />
        );
      })}
    </div>
  );
};

export default Polaroid;
