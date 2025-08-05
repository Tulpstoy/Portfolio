import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FeaturedProjects from "../global/FeaturedProjects";
import CTA_Button from "../components/Building_Blocks/CTA_Button";
import Polaroid from "../components/Building_Blocks/Polaroid";
import "./Home.css";

const Home = () => {
    // Add scroll to top effect at the beginning of the component
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Micah Bron - Developer Portfolio</title>
                <meta name="description" content="Hi, I'm Micah! I'm a developer who values growing through challenges and learning from anyone and everyone. Explore my projects and connect with me." />
                <meta name="keywords" content="developer, portfolio, frontend, React, JavaScript, Vancouver" />
                <meta property="og:title" content="Micah Bron - Developer Portfolio" />
                <meta property="og:description" content="Hi, I'm Micah! I'm a developer who values growing through challenges and learning from anyone and everyone." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://micahbron.com/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Micah Bron - Developer Portfolio" />
                <meta name="twitter:description" content="Hi, I'm Micah! I'm a developer who values growing through challenges and learning from anyone and everyone." />
            </Helmet>
            <div className="page-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="moodboard-container">
                        {/* Header Section */}
                        <div className="moodboard-header">
                            <div className="header-content">
                                <div className="header-polaroids left-polaroids">
                                    <Polaroid id={0} />
                                </div>
                                <div className="header-text">
                                    <h1 className="page-title">Hi, I'm Micah!</h1>
                                    <p className="page-subtitle">I'm a developer who values growing through challenges and learning from anyone and everyone.</p>
                                    <div className="button-group">
                                        <CTA_Button 
                                            to="/about" 
                                            text="Who I Am as a Professional"
                                            icon={
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                            }
                                        />
                                        <CTA_Button 
                                            to="/off-the-clock" 
                                            text="Who I Am in My Downtime"
                                            icon={
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                                </svg>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="header-polaroids right-polaroids">
                                    <Polaroid id={1} isRandomPhoto={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <FeaturedProjects />

                {/* Connect Section */}
                <section className="connect-section">
                    <div className="connect-content">
                        <h2>Connect With Me.</h2>
                        <p>Let's work together to bring your ideas to life.</p>
                        <div className="email-container">
                            <a 
                                href="mailto:micah.bron@icloud.com" 
                                className="email"
                                aria-label="Send me an email"
                            >
                                micah.bron@icloud.com
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
