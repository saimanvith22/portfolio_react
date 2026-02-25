import React, { useState, useEffect } from 'react';
import './Profile.css';

const BackgroundSlideshow: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2069&q=80'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Increased to 5 seconds for better visibility

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <div className="background-overlay"></div>
            <div className="background-slideshow">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>
        </>
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
        "Tech Enthusiast"
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
        // Try both local and GitHub Pages paths
        const resumePaths = [
            `${process.env.PUBLIC_URL}/assets/resume.pdf`,
            `${process.env.PUBLIC_URL}/portfolio_react/assets/resume.pdf`,
            // Add a direct GitHub raw content URL if you have your resume in the repository
            'https://raw.githubusercontent.com/saimanvith22/portfolio_react/main/public/assets/resume.pdf'
        ];

        const tryDownload = async () => {
            for (const path of resumePaths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        const link = document.createElement('a');
                        link.href = path;
                        link.target = '_blank';
                        link.download = 'SaimanvithAnandesi_Resume.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        return true;
                    }
                } catch (error) {
                    console.warn(`Failed to fetch resume from ${path}:`, error);
                }
            }
            return false;
        };

        tryDownload().then(success => {
            if (!success) {
                alert('Resume file not found. Please ensure your resume is uploaded at public/assets/resume.pdf');
            }
        });
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