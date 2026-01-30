
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <Link 
            to={`/${project.id}`} 
            className="group block bg-brand-purple/10 border border-purple-900/20 rounded-xl overflow-hidden hover:border-brand-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(157,0,255,0.15)]"
        >
                        <div className={`aspect-video bg-brand-deep flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent opacity-60"></div>
                <img
  src={project.thumbnail}
  alt={project.title}
  className={`
        ${project.id === 'project-2' ? 'absolute inset-0 w-full h-full object-cover scale-[1.10]' : project.id === 'project-4' ? 'absolute w-full h-full' : 'absolute inset-0 w-full h-full object-cover'}
    ${project.id === 'project-3' ? 'object-left' : ''}
    transition-transform duration-700
        ${project.id === 'project-2' ? 'group-hover:scale-[1.15]' : 'group-hover:scale-105'}
  `}
/>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tools.slice(0, 3).map(tool => (
                        <span key={tool} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-brand-deep border border-purple-900/30 rounded text-purple-300">
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
