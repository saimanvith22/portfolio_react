import React from 'react';
import './Projects.css';

interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
}

const ProjectCard: React.FC<Project> = ({ title, description, image, githubLink }) => (
    <div className="details-container color-container">
        <div className="project-img-container">
            <img src={`${process.env.PUBLIC_URL}${image}`} alt={title} />
        </div>
        <h2 className="experience-sub-title project-title">{title}</h2>
        <p className="project-description">{description}</p>
        <div className="btn-container">
            <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-color-2 project-btn"
            >
                <span className="material-icons">code</span>
                Github
            </a>
        </div>
    </div>
);

const Projects: React.FC = () => {
    const projects = [
        {
            title: 'Dining Scheduler',
            description: 'A smart dining scheduling system for efficient restaurant management',
            image: '/assets/projects/dining.jpg',
            githubLink: 'https://github.com/saimanvith22/hackunt-diningscheduler-backend-master'
        },
        {
            title: 'Amazon Clone',
            description: 'Created a completed amazon clone using React and Redux for updating the Cart',
            image: '/assets/projects/amazon-clone.jpg',
            githubLink: 'https://github.com/saimanvith22/amazon-frontend'
        },
        {
            title: 'Linear LTSF Model',
            description: 'Predicted appliance energy consumption using NanoGPT, LLM and Evaluated model performance with MAE and RMSE',
            image: '/assets/projects/lstm.jpg',
            githubLink: 'https://github.com/saimanvith22/Building-an-LSTM-MODEL'
        }
    ];

    return (
        <section id="projects">
            <p className="section__text__p1">Browse My Recent</p>
            <h1 className="title">Projects</h1>
            <div className="experience-details-container">
                <div className="about-containers">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
            <div className="arrow-container">
                <span 
                    className="material-icons arrow"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    keyboard_arrow_down
                </span>
            </div>
        </section>
    );
};

export default Projects; 