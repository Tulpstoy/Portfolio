import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThumbnailNav from '../components/ThumbnailNav';
import BachelorInfo from '../components/BachelorInfo';
import Welcome from '../components/Welcome';
import '../styles/Postcards.css';

// Import postcard images
import postcard1 from '../assets/postcards/brian.png';
import postcard2 from '../assets/postcards/craig.png';
import postcard3 from '../assets/postcards/damien.png';
import postcard4 from '../assets/postcards/hugo.png';
import postcard5 from '../assets/postcards/joseph.png';
import postcard6 from '../assets/postcards/mat.png';
import postcard7 from '../assets/postcards/robert.png';

// Import thumbnail images
import thumb1 from '../assets/thumbnails/brianThumbnail.png';
import thumb2 from '../assets/thumbnails/craigThumbnail.png';
import thumb3 from '../assets/thumbnails/damienThumbnail.png';
import thumb4 from '../assets/thumbnails/hugoThumbnail.png';
import thumb5 from '../assets/thumbnails/josephThumbnail.png';
import thumb6 from '../assets/thumbnails/matThumbnail.png';
import thumb7 from '../assets/thumbnails/robertThumbnail.png';

const bachelorData = [
  {
    name: "Brian Harding",
    bio: "A laid-back, fun-loving dad who enjoys grilling and spending time outdoors. As a single father to his daughter Daisy, Brian brings warmth and humor to every situation. His easygoing nature and dad jokes make him an endearing character in the neighborhood."
  },
  {
    name: "Craig Cahn",
    bio: "Your old college roommate turned fitness enthusiast. Now a successful business owner and father of three, Craig balances his passion for health with being a loving single dad. Despite his busy schedule, he always makes time for his friends and family."
  },
  {
    name: "Damien Bloodmarch",
    bio: "A romantic Victorian era enthusiast with a gothic aesthetic. Damien works as an IT professional while maintaining his love for the macabre and vintage culture. A caring father to Lucien, he proves that you can be both mysterious and warmhearted."
  },
  {
    name: "Hugo Vega",
    bio: "A passionate high school teacher who takes pride in education and literature. While dealing with his son Ernest's rebellious phase, Hugo maintains his optimistic outlook and dedication to helping others learn and grow."
  },
  {
    name: "Joseph Christiansen",
    bio: "The neighborhood youth minister with a perfect family image. Joseph is known for his baking skills and organizing community events. Behind his charismatic personality lies a complex character dealing with personal struggles."
  },
  {
    name: "Mat Sella",
    bio: "The cool, music-loving owner of the local Coffee Spoon café. A widower raising his daughter alone, Mat channels his passion for music and coffee into creating a welcoming space for the community while dealing with his own social anxiety."
  },
  {
    name: "Robert Small",
    bio: "A mysterious, rough-around-the-edges handyman with a dark sense of humor. Robert enjoys telling supernatural stories and going on late-night adventures. Though initially distant, he has a deep emotional core and a complex past."
  }
];

function Postcards() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current, next) => setActiveIndex(next),
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: false,
    lazyLoad: 'ondemand'
  };

  const postcards = [postcard1, postcard2, postcard3, postcard4, postcard5, postcard6, postcard7];
  const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, thumb7];

  const handleThumbnailClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="postcards-page">
      <div className="grid-container">
        <div className="bio-section">
          <Welcome />
          <BachelorInfo
            name={bachelorData[activeIndex].name}
            bio={bachelorData[activeIndex].bio}
          />
        </div>
        <div className="carousel-section">
          <div className="slider-wrapper">
            <Slider {...settings} ref={sliderRef}>
              {postcards.map((postcard, index) => (
                <div key={index} className="postcard-img">
                  <img src={postcard} alt={`Postcard ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="thumbnail-section">
            <ThumbnailNav
              thumbnails={thumbnails}
              activeIndex={activeIndex}
              onClick={(index) => {
                handleThumbnailClick(index);
                setActiveIndex(index);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postcards; 