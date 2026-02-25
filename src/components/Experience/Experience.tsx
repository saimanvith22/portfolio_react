// Experience.tsx
import React, { useState } from 'react';
import './Experience.css';

type ExperienceItem = {
  id: string;
  title: string;
  role: string;
  duration: string;
  points: string[];
};

const experiences: ExperienceItem[] = [
  {
    id: 'uta',
    title: 'UTA',
    role: 'Web Developer II',
    duration: 'SEP 2025–Present',
    points: [
      'Developed custom REST APIs using C# and ASP.NET MVC to expose Sitecore CMS data, replacing legacy external API integrations.',
      'Built reusable Sitecore components using Glass Mapper, controller renderings, and Razor Views to support scalable content-driven UI.',
      'Built and integrated a custom Sitecore JSON API using C#, Glass Mapper, and LinkManager to expose structured academic program data, supporting both internal Sitecore pages and external program links, and refactored frontend to consume the new private API.',
      'Improved Sitecore CMS navigation performance by replacing expensive Axes.GetDescendants() tree traversal with optimized ContentSearch (Solr) queries, implementing a reusable SearchManager utility and reducing breadcrumb rendering latency.'
    ]
  },
  {
    id: 'unt',
    title: 'UNT',
    role: 'Web Developer',
    duration: 'JAN 2023–DEC 2024',
    points: [
      'Designed and implemented responsive single-page applications using React.js, improving overall user experience and increasing user engagement by 30%.',
      'Developed modular frontend components using React Hooks (useState, useEffect), enabling efficient state management and improved application maintainability.'
    ]
  },
  {
    id: 'wipro',
    title: 'Wipro',
    role: 'Software Engineer',
    duration: 'DEC 2019–DEC 2022',
    points: [
      'Developed scalable backend services using ASP.NET Core and RESTful APIs to support enterprise web applications building reusable frontend components using React.js, TypeScript, and Bootstrap, improving UI consistency and accelerating feature delivery.',
      'Designed and deployed microservices architecture using .NET Core, enabling modular development and improved scalability.',
      'Deployed applications on AWS EC2 and configured reverse proxy and load balancing to improve system reliability and availability.',
      'Implemented CI/CD pipelines using Jenkins to automate build, test, and deployment processes, reducing release cycle time.'
    ]
  }
];

const Experience: React.FC = () => {
  // ✅ One toggle controls ALL cards
  const [showAllDetails, setShowAllDetails] = useState(false);

  const toggleAll = () => setShowAllDetails(prev => !prev);

  return (
    <section id="experience">
      <p className="section__text__p1">Explore My</p>
      <h1 className="title">Experience</h1>

      <div className="experience-details-container">
        <div className="about-containers">
          {experiences.map(exp => (
            <div
              key={exp.id}
              className={`details-container exp-card ${showAllDetails ? 'open' : ''}`}
            >
              {/* Clicking any card toggles ALL */}
              <button type="button" className="exp-header" onClick={toggleAll}>
                <div className="exp-header-left">
                  <h2 className="experience-sub-title exp-title">{exp.title}</h2>
                  <p className="exp-meta">
                    {exp.role} • {exp.duration}
                  </p>
                </div>

                <span className="material-icons exp-chevron">
                  {showAllDetails ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* ✅ Either show points or hide them completely (no blank space) */}
              {showAllDetails && (
                <div className="exp-body">
                  <ul className="exp-points">
                    {exp.points.map((p, i) => (
                      <li key={`${exp.id}-${i}`}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
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