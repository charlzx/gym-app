import React from 'react';
import { timetableData } from '../data/timetableData';

export default function Timetable() {
  return (
    <section id="timetable" className="py-12 px-6 bg-gray-800">
      <h3 className="text-3xl font-bold text-center mb-8">Weekly Timetable</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timetableData.map(({ day, classes }) => (
          <div key={day} className="bg-gray-700 p-4 rounded">
            <h4 className="font-semibold text-lg mb-2">{day}</h4>
            <ul className="space-y-1 text-sm">
              {classes.map((item, index) => (
                <li key={index} className="border-b border-gray-600 pb-1">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
