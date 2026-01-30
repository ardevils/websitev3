
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 mb-12 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105">
                    <span>&larr;</span> Back to Home
                </Link>

                <header className="mb-20">
                    <h1 className="text-5xl font-display font-bold text-white mb-6">Portfolio</h1>
                    <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                        Please take a look at some of my projects I've been working on ranging from branding & visualisation, UI/UX and immersive design.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                
                <div className="mt-24 p-12 bg-brand-deep border border-purple-900/30 rounded-3xl text-center">
                    <h3 className="text-2xl font-display font-bold text-white mb-4">Looking for something specific?</h3>
                    <p className="text-gray-400 mb-8">I am always working on new prototypes and design studies.</p>
                    <a href="mailto:clarecarlton9@gmail.com" className="inline-block px-8 py-4 bg-brand-accent text-white rounded-full font-bold hover:bg-brand-accent/80 transition-all">
                        Inquire About Custom Projects
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
