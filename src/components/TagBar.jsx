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

    return (
        <div className="tagbar-container">
            <div className="tagbar-scroll">
                <div 
                    className={`tagbar-tag ${selectedTag === null ? 'active' : ''}`}
                    onClick={() => onTagClick(null)}
                >
                    All
                </div>
                {tags.map((tag, index) => (
                    <div 
                        key={index} 
                        className={`tagbar-tag ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => onTagClick(tag)}
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagBar;
