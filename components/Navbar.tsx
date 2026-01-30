
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = (id: string) => {
        if (!isHome) {
            navigate(`/#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleHomeClick = () => {
        if (isHome) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        if (isHome && location.hash === '') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleNavbarScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar at top of page or when scrolling up
            if (currentScrollY < 100 || currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Hide navbar when scrolling down past 100px
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleNavbarScroll);
        return () => {
            window.removeEventListener('scroll', handleNavbarScroll);
        };
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 bg-brand-black/80 backdrop-blur-md border-b border-purple-900/30 transition-all duration-300 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <button onClick={handleHomeClick} className="text-2xl font-display font-bold text-white tracking-tighter hover:text-brand-accent transition-colors cursor-pointer">
                    CLARE <span className="text-brand-accent">CARLTON</span>
                </button>
                
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
                    <button
                        onClick={handleHomeClick}
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Home
                    </button>
                    
                    <button 
                        onClick={() => handleScroll('featured')} 
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Featured Work
                    </button>
                    
                    <button 
                        onClick={() => handleScroll('about')} 
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        About
                    </button>
                    
                    <button 
                        onClick={() => handleScroll('contact')} 
                        className="hover:text-brand-accent transition-colors cursor-pointer"
                    >
                        Contact
                    </button>

                    <Link to="/portfolio" className="ml-4 px-6 py-2 bg-brand-accent hover:bg-brand-accent/80 text-white font-bold rounded-full transition-all transform hover:scale-105">
                        Portfolio
                    </Link>
                </div>

                <div className="md:hidden">
                    {/* Mobile menu toggle would go here */}
                    <Link to="/portfolio" className="bg-brand-accent px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all">
                        Portfolio
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
