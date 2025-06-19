import React, { useState, useEffect } from 'react';
import { heroImages } from '../data/heroImages';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img
        src={heroImages[currentImage]}
        alt="Hero"
        className="absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Welcome to PrimeFit Gym</h1>
        <p className="text-white text-lg md:text-2xl max-w-xl">Unleash your potential with our expert-led classes and AI-powered fitness planning.</p>
        <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">Join Now</button>
      </div>
    </section>
  );
};

export default Hero;
