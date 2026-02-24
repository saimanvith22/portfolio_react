import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <section id="about">
            <p className="section__text__p1">Get to know more</p>
            <h1 className="title">About Me</h1>
            <div className="section-container">
                <div className="section__pic-container">
                    <div className="about-pic">
                        <img 
                            src={`${process.env.PUBLIC_URL}/assets/images/profile.jpg`} 
                            alt="Saimanvith Anandesi"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `${process.env.PUBLIC_URL}/portfolio_react/assets/images/profile.jpg`;
                            }}
                        />
                    </div>
                </div>
                <div className="about-details-container">
                    <div className="about-container">
                        <div className="details-container experience">
                            <span className="material-icons icon">work</span>
                            <h3>Experience</h3>
                            <p>5+ years<br/>Software Development</p>
                        </div>
                        <div className="details-container education">
                            <span className="material-icons icon">school</span>
                            <h3>Education</h3>
                            <p>Masters Degree in Computer Science</p>
                        </div>
                    </div>
                    <div className="text-container">
                        <p>
                            Result-driven graduate and full stack developer with 5+ years of experience in building 
                            performant front-end interfaces and backend with .NET, Sitecore, React, Node.js, MongoDB, and other 
                            JavaScript-based stacks.
                        </p>
                    </div>
                </div>
            </div>
            <div className="arrow-container">
                <span 
                    className="material-icons arrow"
                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    keyboard_arrow_down
                </span>
            </div>
        </section>
    );
};

export default About; 