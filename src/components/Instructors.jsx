import React from 'react';
import { instructorsData } from '../data/instructorsData';

export default function Instructors() {
  return (
    <section id="instructors" className="py-12 px-6 bg-gray-900">
      <h3 className="text-3xl font-bold text-center mb-8">Meet Our Instructors</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {instructorsData.map(({ name, bio, image }, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded shadow">
            <img src={image} alt={name} className="w-full h-48 object-cover rounded mb-4" />
            <h4 className="text-xl font-semibold mb-2">{name}</h4>
            <p className="text-sm text-gray-400">{bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
