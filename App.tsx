
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import BackToTop from './components/BackToTop.tsx';
import Home from './pages/Home.tsx';
import Portfolio from './pages/Portfolio.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-brand-black selection:bg-brand-accent selection:text-white">
                <Navbar />
                <BackToTop />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/:id" element={<ProjectDetail />} />
                    </Routes>
                </main>
                
                <footer className="py-12 px-6 border-t border-purple-900/20 bg-brand-black">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <Link to="/" className="text-xl font-display font-bold text-white tracking-tighter">
                                CLARE <span className="text-brand-accent">CARLTON</span>
                            </Link>
                            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-medium">
                                Game Developer & Designer &bull; Based in Newcastle
                            </p>
                        </div>
                        <div className="flex space-x-8 text-sm text-gray-400">
                            <a href="mailto:clarecarlton9@gmail.com" className="hover:text-brand-accent transition-colors">Email</a>
                            <a href="https://www.linkedin.com/in/clarecarlton9/" className="hover:text-brand-accent transition-colors">LinkedIn</a>
                        </div>
                        <p className="text-gray-600 text-xs font-mono">
                            &copy; {new Date().getFullYear()} Clare Carlton. Built with HTML and Pain 😫
                        </p>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default App;
