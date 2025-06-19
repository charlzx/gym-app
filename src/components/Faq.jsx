import React, { useState } from 'react';
import faqData from '../data/faqData';

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-gray-800 rounded-lg">
      <button
        onClick={onClick}
        className="faq-question w-full flex justify-between items-center text-left text-lg font-semibold text-white p-6 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{item.q}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`faq-answer overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <p className="text-gray-400 p-6 pt-0">{item.a}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 mt-2">Have questions? We've got answers.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


export default Faq;