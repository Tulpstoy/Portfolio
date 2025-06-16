import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../global/ProjectCard';
import projectData from '../data/ProjectCards.json';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
    const { projects } = projectData;

    // Pick 2 featured projects — you can adjust this logic as needed
    const featuredProjects = projects.filter(project => [1, 2].includes(project.id));

    return (
        <section className="projects-section featured-projects">
            <div className="container">
                <h2>Featured Projects.</h2>
                <h5>Here are two projects that highlight my recent work and skills.</h5>

                <div className="projects-grid">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} showTags={false} />
                    ))}
                </div>

                <div className="center-button">
                    <Link to="/projects" className="cta-button">See All Projects</Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
