import React, { useState, useEffect } from 'react';

interface ImageLightboxProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [images.length]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-brand-accent transition-colors text-2xl font-bold"
                    aria-label="Close lightbox"
                >
                    ✕
                </button>

                {/* Main image */}
                <div className="relative aspect-video bg-brand-deep rounded-lg overflow-hidden">
                    <img
                        src={images[currentIndex]}
                        alt={`Gallery image ${currentIndex + 1}`}
                        className="w-full h-full object-contain block"
                    />
                </div>

                {/* Previous button */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-3 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-full transition-all transform hover:scale-110"
                    aria-label="Previous image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next button */}
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-3 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-full transition-all transform hover:scale-110"
                    aria-label="Next image"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Image Counter and Thumbnail Strip */}
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

export default ImageLightbox;
