import React, { useState, useEffect } from 'react';

interface DevelopmentDeckProps {
    images: string[];
    onClose: () => void;
}

const DevelopmentDeck: React.FC<DevelopmentDeckProps> = ({ images, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, images.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-hidden">
            <div className="relative w-full max-w-4xl">
                {/* Main Image */}
                <div className="relative aspect-video bg-brand-deep rounded-lg overflow-hidden">
                    <img
                        src={images[currentIndex]}
                        alt={`Development slide ${currentIndex + 1}`}
                        className="w-full h-full object-contain block"
                        style={{ clipPath: 'inset(2px 0 0 0)' }}
                    />
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 text-white hover:text-brand-accent transition-colors p-4 text-3xl"
                    aria-label="Previous slide"
                >
                    ←
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 text-white hover:text-brand-accent transition-colors p-4 text-3xl"
                    aria-label="Next slide"
                >
                    →
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-brand-accent transition-colors text-2xl font-bold"
                    aria-label="Close deck"
                >
                    ✕
                </button>

                {/* Image Counter */}
                <div className="text-center mt-6 text-gray-400">
                    <p className="text-sm mb-4">
                        {currentIndex + 1} / {images.length}
                    </p>

                    {/* Thumbnail Strip */}
                    <div className="flex justify-center gap-2 overflow-x-auto pb-4">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all ${
                                    index === currentIndex
                                        ? 'border-brand-accent scale-110'
                                        : 'border-gray-600 hover:border-gray-400 opacity-60 hover:opacity-100'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover rounded"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keyboard Instructions */}
                <p className="text-center text-gray-500 text-xs mt-4">
                    Use arrow keys or click arrows to navigate • Press ESC to close
                </p>
            </div>
        </div>
    );
};

export default DevelopmentDeck;
