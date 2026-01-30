import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../constants';
import profilePhoto from '../assets/about me/Clare_ProfilePhoto.png';

const Home: React.FC = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 3);

    return (
        <div className="pt-20">
            {/* 1. Hero Section */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 bg-gradient-purple relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl">
                    <span className="text-brand-accent font-bold tracking-[0.3em] uppercase mb-4 block text-sm animate-pulse">
                        Based in Newcastle upon Tyne
                    </span>
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 leading-tight">
                        Clare <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-fuchsia-400">Carlton</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Aspiring <span className="text-white font-medium">Game Developer</span> and <span className="text-white font-medium">Designer</span>. 
                        Bringing thoughtful design to immersive digital experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-full font-bold transition-all transform hover:scale-105"
                        >
                            View Featured Work
                        </button>
                        <button 
                            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold transition-all"
                        >
                            Read My Story
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Featured Projects Section */}
            <section id="featured" className="py-32 px-6 bg-brand-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                        <div>
                            <h2 className="text-4xl font-display font-bold text-white mb-4">Featured Work</h2>
                            <p className="text-gray-400 max-w-xl">A curated selection of my projects in graphic and game design.</p>
                        </div>
                        <Link to="/portfolio" className="px-6 py-3 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105">View Full Portfolio &rarr;</Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. About Me Section */}
            <section id="about" className="py-32 px-6 bg-brand-deep">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] bg-brand-purple/20 border border-purple-500/20 rounded-3xl flex items-center justify-center relative z-10 overflow-hidden">
                            <img 
                                src={profilePhoto} 
                                alt="Clare Carlton" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl z-0"></div>
                        <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-display font-bold text-white mb-8">About Me</h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                I am a designer and developer from <span className="text-brand-light font-medium">York</span>, currently based in <span className="text-brand-light font-medium">Newcastle upon Tyne</span>. 
                                I studied both <span className="text-white">Graphic Design BA (Hons)</span> and <span className="text-white"> Digital and Immersive Arts (MA)</span> at Northumbria University, where I specialised in Game Design and interactive experiences. 
                            </p>
                            <p>
                                 My work sits at the intersection of visual design, user experience, and immersive worlds. 
                                 I’m passionate about creating interfaces and game environments where every element serves a clear purpose-whether guiding a player, telling a story, or enhancing usability.
                            </p>
                            <p>
                                With a background in both design and development, I approach projects with a balance of aesthetic sensibility and practical problem-solving, crafting experiences that are engaging, intuitive, and visually cohesive.
                            </p>
                        </div>
                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-purple-900/50 pt-10">
                            <div>
                                <h4 className="text-brand-accent font-bold uppercase text-xs tracking-widest mb-2">Education</h4>
                                <ul className="text-sm text-gray-400 space-y-2">
                                    <li>MA Immersive and Digital Arts</li>
                                    <li>BA (Hons) Graphic Design</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-brand-accent font-bold uppercase text-xs tracking-widest mb-2">Specialisms</h4>
                                <ul className="text-sm text-gray-400 space-y-2">
                                    <li>Game & Interactive Design</li>
                                    <li>UX Design</li>
                                    <li>Branding & Visual Design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-32 px-6 bg-brand-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-accent/5 pointer-events-none"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl font-display font-bold text-white mb-6">Let's Build Something Together</h2>
                    <p className="text-gray-400 mb-12 text-lg">
                        I'm open to opportunities across UX, interactive design, and game development. 
                        Whether you're seeking collaboration, discussing design challenges, or exploring interactive experiences, I'd be happy to connect.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <a href="mailto:clarecarlton9@gmail.com" className="w-full md:w-auto px-10 py-5 bg-white text-brand-black rounded-xl font-bold hover:bg-brand-accent hover:text-white transition-all">
                            Email Me
                        </a>
                        <div className="flex gap-6">
                            <a href="https://www.linkedin.com/in/clarecarlton9/" className="text-gray-400 hover:text-white font-medium transition-colors">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
