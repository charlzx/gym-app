import React, { useState } from 'react';
import { faqData } from '../data/faqData';

function FaqItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-600 py-3">
      <button onClick={onClick} className="w-full text-left font-semibold text-lg">
        {item.question}
      </button>
      {isOpen && <p className="mt-2 text-sm text-gray-400">{item.answer}</p>}
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-12 px-6 bg-gray-900">
      <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
      <div className="max-w-2xl mx-auto">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}
