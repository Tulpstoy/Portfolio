import React from 'react';
import { Helmet } from 'react-helmet-async';
import FeaturedProjects from "../global/FeaturedProjects";
import CTA_Button from "../components/Building_Blocks/CTA_Button";
import Polaroid from "../components/Building_Blocks/Polaroid";
import ConnectSection from "../components/ProjectComponents/ConnectSection";
import "./Home.css";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Micah Bron - Front-End Developer Portfolio</title>
                <meta name="description" content="Micah Bron is a front-end developer based in Vancouver, specializing in React, JavaScript, and creating playful yet well-structured web experiences." />
                <meta name="keywords" content="front-end developer, React, JavaScript, Vancouver, web development, portfolio" />
                <meta property="og:title" content="Micah Bron - Front-End Developer Portfolio" />
                <meta property="og:description" content="Micah Bron is a front-end developer based in Vancouver, specializing in React, JavaScript, and creating playful yet well-structured web experiences." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://micahbron.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Micah Bron - Front-End Developer Portfolio" />
                <meta name="twitter:description" content="Micah Bron is a front-end developer based in Vancouver, specializing in React, JavaScript, and creating playful yet well-structured web experiences." />
            </Helmet>
            <div className="page-container">
                <section className="hero-section">
                    <div className="hero-content">
                        <div className="header-polaroids left-polaroids">
                            <Polaroid id={0} />
                        </div>
                        <div className="hero-text">
                            <h1 className="page-title">Hi, I'm Micah!</h1>
                            <p className="hero-description">
                                I'm a front-end developer based in Vancouver, BC. I create playful experiences that balance being well-structured and clean.
                            </p>
                            <div className="button-group">
                                <CTA_Button 
                                    text="View My Work" 
                                    link="/projects" 
                                    variant="primary"
                                />
                                <CTA_Button 
                                    text="Learn More About Me" 
                                    link="/about" 
                                    variant="secondary"
                                />
                            </div>
                        </div>
                        <div className="header-polaroids right-polaroids">
                            <Polaroid id={1} isRandomPhoto={true} />
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <FeaturedProjects />

                {/* Connect Section */}
                <ConnectSection />
            </div>
        </>
    );
}

export default Home;
