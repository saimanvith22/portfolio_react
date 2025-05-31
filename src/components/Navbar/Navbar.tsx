import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Dialog from '../Dialog/Dialog';

interface DialogState {
    about: boolean;
    experience: boolean;
    projects: boolean;
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [dialogOpen, setDialogOpen] = useState<DialogState>({
        about: false,
        experience: false,
        projects: false
    });

    const aboutPoints = [
        "Full Stack Developer with 4+ years of experience in building web applications",
        "Masters in Computer Science from University of North Texas",
        "Proficient in React, Node.js, TypeScript, and cloud technologies",
        "Strong problem-solving skills and experience in agile development"
    ];

    const experiencePoints = [
        "Led development of multiple full-stack applications using React and Node.js",
        "Implemented CI/CD pipelines and automated testing frameworks",
        "Collaborated with cross-functional teams to deliver high-quality software",
        "Mentored junior developers and conducted code reviews"
    ];

    const projectPoints = [
        "Amazon Clone: Built a full-featured e-commerce platform with React and Redux",
        "Dining Scheduler: Developed a smart restaurant management system",
        "Linear LTSF Model: Created an ML model for energy consumption prediction"
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id') || '';
                }
            });
            
            setActiveSection(current);
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (isMenuOpen && !target.closest('.hamburger-menu')) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: keyof DialogState) => {
        e.preventDefault();
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Wait for scroll to complete before showing dialog
            setTimeout(() => {
                setDialogOpen(prev => ({ ...prev, [section]: true }));
            }, 1000); // Adjust timing as needed
        }
    };

    const closeDialog = (section: keyof DialogState) => {
        setDialogOpen(prev => ({ ...prev, [section]: false }));
    };

    const navLinks = [
        { href: '#about', text: 'About', key: 'about' as keyof DialogState },
        { href: '#experience', text: 'Experience', key: 'experience' as keyof DialogState },
        { href: '#projects', text: 'Projects', key: 'projects' as keyof DialogState },
        { href: '#contact', text: 'Contact' }
    ];

    return (
        <>
            <nav id="desktop-nav" className={isScrolled ? 'scrolled' : ''}>
                <div className="logo">SaiManvith Anandesi</div>
                <div>
                    <ul className="nav-links">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <a 
                                    href={link.href}
                                    className={activeSection === link.href.slice(1) ? 'active' : ''}
                                    onClick={link.key ? (e) => handleNavClick(e, link.key) : undefined}
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <nav id="hamburger-nav" className={isScrolled ? 'scrolled' : ''}>
                <div className="logo">SaiManvith Anandesi</div>
                <div className="hamburger-menu">
                    <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
                        {navLinks.map(link => (
                            <a 
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    toggleMenu();
                                    if (link.key) handleNavClick(e, link.key);
                                }}
                                className={activeSection === link.href.slice(1) ? 'active' : ''}
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            <Dialog 
                isOpen={dialogOpen.about}
                onClose={() => closeDialog('about')}
                title="About Me"
                points={aboutPoints}
            />
            <Dialog 
                isOpen={dialogOpen.experience}
                onClose={() => closeDialog('experience')}
                title="My Experience"
                points={experiencePoints}
            />
            <Dialog 
                isOpen={dialogOpen.projects}
                onClose={() => closeDialog('projects')}
                title="My Projects"
                points={projectPoints}
            />
        </>
    );
};

export default Navbar; 