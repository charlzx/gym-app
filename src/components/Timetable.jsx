import React from 'react';
import { timetableData } from '../data/timetableData';

const Timetable = () => {
  const colorClasses = {
    blue: 'text-blue-400',
    red: 'text-red-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
  };

  return (
    <section id="timetable" className="py-16 sm:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Class Timetable</h2>
          <p className="text-gray-400 mt-2">Join our world-class group fitness sessions.</p>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-center text-gray-300 border-separate border-spacing-0">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th className="px-6 py-4 sticky left-0 z-10 bg-gray-700">Time</th>
                <th className="px-6 py-4">Monday</th>
                <th className="px-6 py-4">Tuesday</th>
                <th className="px-6 py-4">Wednesday</th>
                <th className="px-6 py-4">Thursday</th>
                <th className="px-6 py-4">Friday</th>
                <th className="px-6 py-4">Saturday</th>
              </tr>
            </thead>
            <tbody>
              {timetableData.map((row, rowIndex) => (
                <tr
                  key={row.time}
                  className={`${rowIndex % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} border-b border-gray-700`}
                >
                  <th className="px-6 py-4 font-medium text-white sticky left-0 z-10 bg-inherit">
                    {row.time}
                  </th>
                  {row.classes.map((className, classIndex) => (
                    <td
                      key={classIndex}
                      className={`px-6 py-4 ${
                        row.colors[classIndex]
                          ? `${colorClasses[row.colors[classIndex]]} font-semibold`
                          : ''
                      }`}
                    >
                      {className}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Timetable;
