import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <section id="contact">
            <p className="section__text__p1">Get in Touch</p>
            <h1 className="title">Contact Me</h1>
            <div className="contact-info-upper-container">
                <div className="contact-info-container">
                    <span className="material-icons contact-icon">email</span>
                    <p>
                        <a href="mailto:saimanvith22@gmail.com">saimanvith22@gmail.com</a>
                    </p>
                </div>
                <div className="contact-info-container">
                    <span className="material-icons contact-icon">person</span>
                    <p>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact; 
