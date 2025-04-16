import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImage from "../assets/SquarePortrait.webp";
import ProjectCard from '../global/ProjectCard';
import projectData from '../data/ProjectCards.json';
import "./Home.css";

const Home = () => {
    const { projects } = projectData;

    // Add scroll to top effect at the beginning of the component
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-image">
                            <img src={profileImage} alt="Micah Bron" className="profile-image" />
                        </div>
                        <div className="hero-text">
                            <h1>Hi, I'm Micah.</h1>
                            <p>I'm a developer who values growing through challenges and learning from anyone and everyone.</p>
                            <Link to="/about" className="cta-button">Learn About Me</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects-section">
                <div className="container">
                    <h2>Featured Projects.</h2>
                    <p>Here are some of my recent projects that showcase my skills and experience.</p>
                    
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    <div className="center-button">
                        <Link to="/projects" className="cta-button">More Projects</Link>
                    </div>
                </div>
            </section>

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
    );
}

export default Home;