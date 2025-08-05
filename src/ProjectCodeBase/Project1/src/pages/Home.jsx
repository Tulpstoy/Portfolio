/**
 * Home Page Component
 * 
 * Main landing page featuring:
 * - Dream Daddy logo
 * - Game description
 * - Link to Postcards section
 * - Character customization preview image
 * 
 * Layout uses a two-column grid structure:
 * - Left: Logo, description, and CTA button
 * - Right: Feature image in a styled container
 */

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import buildThatDad from '../assets/images/build-that-dad.webp';
import '../styles/Home.css';

const Home = () => {
	return (
		<div className="home-container">
			<div className="content-wrapper">
				<div className="left-content">
					<img src={logo} alt="Dream Daddy Logo" className="dream-daddy-logo" />
					<p className="game-description">
						Dream Daddy: A Dad Dating Simulator is a game where you play as a Dad
						and your goal is to meet and romance other hot Dads. With minigames,
						multiple endings, and a variety of Dads to choose from, find your
						perfect Dad match in this heartwarming and humorous dating simulation.
					</p>
					<Link to="/postcards" className="explore-button">
						Explore Postcards
					</Link>
				</div>
				<div className="right-content">
					<div className="image-container">
						<img src={buildThatDad} alt="Build That Dad" className="feature-image" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
