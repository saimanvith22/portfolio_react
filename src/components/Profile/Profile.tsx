import React, { useState, useEffect } from 'react';
import './Profile.css';

const BackgroundSlideshow: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80',  // Clean coding setup
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',  // Code on screen
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',  // Modern laptop workspace
        'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80',     // Dark workspace
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80'   // Modern office setup
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="background-slideshow">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
        </div>
    );
};

const Profile: React.FC = () => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const titles = [
        "Frontend Developer",
        "Software Developer",
        "Backend Developer",
        "Fullstack Developer",
        "Software Developer in Test",
        "Problem Solver",
        "Learner",
        "Coder",
        "Control Engineer"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prevIndex) => 
                prevIndex === titles.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [titles.length]);

    const handleDownloadCV = () => {
        window.open('/resume.pdf', '_blank');
    };

    return (
        <section id="profile">
            <BackgroundSlideshow />
            <div className="profile-content">
                <p className="section__text__p1">Hello, I'm</p>
                <h1 className="title">SaiManvith Anandesi</h1>
                <div className="section__text__p2">
                    <div className="animated-text">
                        {titles.map((title, index) => (
                            <span
                                key={title}
                                className={index === currentTitleIndex ? 'visible' : ''}
                            >
                                {title}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="btn-container">
                    <button 
                        className="btn btn-color-2" 
                        onClick={handleDownloadCV}
                    >
                        <span className="material-icons">download</span>
                        Download CV
                    </button>
                    <button 
                        className="btn btn-color-1" 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="material-icons">mail</span>
                        Contact Info
                    </button>
                </div>
                <div id="socials-container">
                    <a 
                        href="https://www.linkedin.com/in/anandesi-saimanvith-6378a623b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <span className="material-icons">link</span>
                    </a>
                    <a 
                        href="https://github.com/saimanvith22"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <span className="material-icons">code</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Profile; 