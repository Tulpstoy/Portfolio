// src/components/Slider.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 
const BannerSlider = () => {
 
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
 
	return (
		<Slider {...settings} className="home-banner">
			<div><h3>Slide 1</h3></div>
			<div><h3>Slide 2</h3></div>
			<div><h3>Slide 3</h3></div>
		</Slider>
	);
};
 
export default BannerSlider;
