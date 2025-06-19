import React, { useState, useEffect, useCallback } from 'react';
import { heroImages } from '../data/heroImages'; // make sure this file exists and exports an array

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section id="hero" className="relative w-full h-[85vh] overflow-hidden">
      <div className="w-full h-full relative">
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={src} alt={`Gym scene ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">DEFINE YOUR STRENGTH</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md">
          Achieve your fitness goals in a clean, modern, and motivating environment.
        </p>
        <a
          href="#contact"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
        >
          Get a Free Pass
        </a>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ${
              index === currentIndex ? 'bg-blue-500' : 'bg-white opacity-50 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;