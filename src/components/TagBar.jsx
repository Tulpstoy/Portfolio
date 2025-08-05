import React, { useState, useEffect } from 'react';
import './TagBar.css';
import projectData from '../data/ProjectCards.json';

const TagBar = ({ selectedTag, onTagClick }) => {
    const { projects } = projectData;
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const allTags = projects.flatMap(project => project.tags);
        const uniqueTags = [...new Set(allTags)];
        setTags(uniqueTags);
    }, []);

    const getTagIcon = (tag) => {
        switch(tag) {
            case 'Development':
                return (
                    <svg className="tag-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                    </svg>
                );
            case 'Design':
                return (
                    <svg className="tag-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                );
            case 'UX Research':
                return (
                    <svg className="tag-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    const getTagColor = (tag) => {
        switch(tag) {
            case 'Development':
                return 'development-tag';
            case 'Design':
                return 'design-tag';
            case 'UX Research':
                return 'ux-research-tag';
            default:
                return 'default-tag';
        }
    };

    return (
        <div className="tagbar-container">
            <div className="tagbar-scroll">
                <div 
                    className={`tagbar-tag all-tag ${selectedTag === null ? 'active' : ''}`}
                    onClick={() => onTagClick(null)}
                >
                    <svg className="tag-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                        <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
                    </svg>
                    All
                </div>
                {tags.map((tag, index) => (
                    <div 
                        key={index} 
                        className={`tagbar-tag ${getTagColor(tag)} ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => onTagClick(tag)}
                    >
                        {getTagIcon(tag)}
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagBar;
