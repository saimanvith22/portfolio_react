import React, { useState, useEffect } from 'react';
import './Experience.css';

interface SkillProps {
    name: string;
    level: string;
    icon: string;
    isShuffling: boolean;
}

const Skill: React.FC<SkillProps> = ({ name, level, icon, isShuffling }) => (
    <article className={isShuffling ? 'shuffling' : ''}>
        <span className="material-icons icon">{icon}</span>
        <div>
            <h3>{name}</h3>
            <p>{level}</p>
        </div>
    </article>
);

const Experience: React.FC = () => {
    const [frontendSkills, setFrontendSkills] = useState([
        { name: 'HTML', level: 'Experienced', icon: 'html' },
        { name: 'CSS', level: 'Experienced', icon: 'css' },
        { name: 'JavaScript', level: 'Experienced', icon: 'javascript' },
        { name: 'TypeScript', level: 'Intermediate', icon: 'code' },
        { name: 'React', level: 'Experienced', icon: 'web' },
        { name: 'Angular', level: 'Intermediate', icon: 'web_asset' }
    ]);

    const [backendSkills, setBackendSkills] = useState([
        { name: 'Node.js', level: 'Experienced', icon: 'dns' },
        { name: 'Java', level: 'Experienced', icon: 'coffee' },
        { name: 'Express.js', level: 'Intermediate', icon: 'http' },
        { name: 'MongoDB', level: 'Intermediate', icon: 'storage' },
        { name: 'Git', level: 'Experienced', icon: 'source' },
        { name: 'Springboot', level: 'Intermediate', icon: 'settings' }
    ]);

    const [isShuffling, setIsShuffling] = useState(false);

    const shuffleArray = <T extends any>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    useEffect(() => {
        const shuffleInterval = setInterval(() => {
            setIsShuffling(true);
            setTimeout(() => {
                setFrontendSkills(prev => shuffleArray([...prev]));
                setBackendSkills(prev => shuffleArray([...prev]));
                setIsShuffling(false);
            }, 500);
        }, 3000);

        return () => clearInterval(shuffleInterval);
    }, []);

    return (
        <section id="experience">
            <p className="section__text__p1">Explore My</p>
            <h1 className="title">Experience</h1>
            <div className="experience-details-container">
                <div className="about-containers">
                    <div className="details-container">
                        <h2 className="experience-sub-title">Frontend Development</h2>
                        <div className="article-container">
                            {frontendSkills.map((skill, index) => (
                                <Skill 
                                    key={skill.name} 
                                    {...skill} 
                                    isShuffling={isShuffling}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="details-container">
                        <h2 className="experience-sub-title">Backend Development</h2>
                        <div className="article-container">
                            {backendSkills.map((skill, index) => (
                                <Skill 
                                    key={skill.name} 
                                    {...skill} 
                                    isShuffling={isShuffling}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="arrow-container">
                <span 
                    className="material-icons arrow"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    keyboard_arrow_down
                </span>
            </div>
        </section>
    );
};

export default Experience; 