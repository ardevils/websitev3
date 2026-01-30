
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ImageLightbox from '../components/ImageLightbox';
import DevelopmentDeck from '../components/DevelopmentDeck';
import { PROJECTS } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = PROJECTS.find(p => p.id === id);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [deckOpen, setDeckOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [currentGallery, setCurrentGallery] = useState<string[]>([]);
    const contentRef = useScrollReveal();
    const galleryRef = useScrollReveal();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!project) {
            navigate('/portfolio');
        }
    }, [project, navigate]);

    if (!project) return null;

    return (
        <div className="pt-32 pb-32 px-6">
            {lightboxOpen && currentGallery.length > 0 && (
                <ImageLightbox
                    images={currentGallery}
                    initialIndex={selectedImageIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
            {deckOpen && project.gallery && (
                <DevelopmentDeck
                    images={project.gallery}
                    onClose={() => setDeckOpen(false)}
                />
            )}
            <div className="max-w-5xl mx-auto">
                {/* Back Navigation */}
                <nav className="flex items-center space-x-4 mb-12 text-sm text-gray-400 uppercase tracking-widest font-bold">
                    <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
                    <span className="text-purple-900">&bull;</span>
                    <Link to="/portfolio" className="hover:text-brand-accent transition-colors">Portfolio</Link>
                    <span className="text-purple-900">&bull;</span>
                    <span className="text-white">{project.title}</span>
                </nav>

                <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">{project.title}</h1>

                {/* Main Media Area */}
                <div className="w-full aspect-video bg-brand-deep rounded-2xl border border-purple-900/40 overflow-hidden mb-16 flex items-center justify-center relative">
                    {project.videoUrl ? (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={project.videoUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0]}
                            title={project.title}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    ) : (
                        <>
                            <div className={`w-full h-full flex items-center justify-center ${project.id === 'project-4' ? 'bg-black' : ''}`}>
                                <img 
                                    src={project.media} 
                                    alt={project.title}
                                    className={`object-cover ${project.id === 'project-4' ? 'pt-32' : 'w-full h-full'}`}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent"></div>
                        </>
                    )}
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-16 transition-all duration-700 ${
                    contentRef.isVisible ? 'opacity-100' : 'opacity-0'
                }`} ref={contentRef.ref}>
                    {/* Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                                <span className="w-8 h-px bg-brand-accent mr-4"></span>
                                Project Overview
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                {project.longDescription}
                            </p>
                        </div>

                        {/* Tag project has three separate sections */}
                        {project.id === 'project-2' ? (
                            <>
                                {/* Concept Section */}
                                {project.conceptGallery && (
                                    <div className="mb-16">
                                        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-px bg-brand-accent mr-4"></span>
                                            Concept
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {project.conceptGallery.slice(0, 3).map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setCurrentGallery(project.conceptGallery || []);
                                                        setSelectedImageIndex(index);
                                                        setLightboxOpen(true);
                                                    }}
                                                    className="aspect-square bg-brand-purple/10 border border-purple-900/30 rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all cursor-pointer group"
                                                >
                                                    <img 
                                                        src={image} 
                                                        alt={`${project.title} concept ${index + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {project.conceptGallery.length > 3 && (
                                            <button
                                                onClick={() => {
                                                    setCurrentGallery(project.conceptGallery || []);
                                                    setSelectedImageIndex(0);
                                                    setLightboxOpen(true);
                                                }}
                                                className="mt-8 px-8 py-4 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105"
                                            >
                                                View All Concept Images ({project.conceptGallery.length} images)
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Development Deck Section */}
                                {project.gallery && (
                                    <div className="mb-16">
                                        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-px bg-brand-accent mr-4"></span>
                                            Development Deck
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {project.gallery.slice(0, 3).map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setDeckOpen(true)}
                                                    className="aspect-square bg-brand-purple/10 border border-purple-900/30 rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all cursor-pointer group"
                                                >
                                                    <img 
                                                        src={image} 
                                                        alt={`${project.title} development ${index + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {project.gallery.length > 3 && (
                                            <button
                                                onClick={() => setDeckOpen(true)}
                                                className="mt-8 px-8 py-4 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105"
                                            >
                                                View Full Development Deck ({project.gallery.length} slides)
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Final Outcome Section */}
                                {project.finalGallery && (
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                                            <span className="w-8 h-px bg-brand-accent mr-4"></span>
                                            Final Outcome
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {project.finalGallery.slice(0, 3).map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setCurrentGallery(project.finalGallery || []);
                                                        setSelectedImageIndex(index);
                                                        setLightboxOpen(true);
                                                    }}
                                                    className="aspect-square bg-brand-purple/10 border border-purple-900/30 rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all cursor-pointer group"
                                                >
                                                    <img 
                                                        src={image} 
                                                        alt={`${project.title} final ${index + 1}`}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {project.finalGallery.length > 3 && (
                                            <button
                                                onClick={() => {
                                                    setCurrentGallery(project.finalGallery || []);
                                                    setSelectedImageIndex(0);
                                                    setLightboxOpen(true);
                                                }}
                                                className="mt-8 px-8 py-4 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105"
                                            >
                                                View All Final Outcomes ({project.finalGallery.length} images)
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                                    <span className="w-8 h-px bg-brand-accent mr-4"></span>
                                    {project.id === 'project-3' ? 'Development Deck' : 'Gallery'}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {project.gallery && project.gallery.slice(0, project.id === 'project-3' ? 3 : project.gallery.length).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (project.id === 'project-3') {
                                                    setDeckOpen(true);
                                                } else {
                                                    setCurrentGallery(project.gallery || []);
                                                    setSelectedImageIndex(index);
                                                    setLightboxOpen(true);
                                                }
                                            }}
                                            className="aspect-square bg-brand-purple/10 border border-purple-900/30 rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all cursor-pointer group"
                                        >
                                            <img 
                                                src={image} 
                                                alt={`${project.title} gallery ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </button>
                                    ))}
                                </div>
                                {project.id === 'project-3' && project.gallery && project.gallery.length > 3 && (
                                    <button
                                        onClick={() => setDeckOpen(true)}
                                        className="mt-8 px-8 py-4 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105"
                                    >
                                        View Full Development Deck ({project.gallery.length} slides)
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Sidebar */}
                    <div className="space-y-12">
                        <div className="bg-brand-deep/50 border border-purple-900/20 p-8 rounded-2xl">
                            <h3 className="text-brand-accent font-bold uppercase text-xs tracking-widest mb-6">Tools & Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 bg-brand-purple/20 text-brand-light border border-purple-500/20 rounded-md text-sm">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-l-2 border-brand-accent pl-8 py-2">
                            <h3 className="text-white font-bold mb-4">Interested in this project?</h3>
                            <p className="text-sm text-gray-400 mb-6">I can provide more technical details or source code upon request.</p>
                            <a href="mailto:clarecarlton9@gmail.com" className="text-brand-accent font-bold hover:underline">Get in touch &rarr;</a>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-32 pt-16 border-t border-purple-900/30">
                    <Link to="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105">
                        <span>&larr;</span> Back to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;