import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 z-40 flex flex-col items-center gap-2 group"
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-accent rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-brand-accent hover:bg-brand-accent/90 text-white rounded-full p-4 shadow-xl transition-all transform hover:scale-110 active:scale-95">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M12 19V5M5 12l7-7 7 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Back to Top
                    </span>
                </button>
            )}
        </>
    );
};

export default BackToTop;
