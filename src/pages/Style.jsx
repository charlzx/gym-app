import React from 'react';

const Style = () => {
    // This now reflects the default Tailwind colors used across the app
    const coreColors = [
        { name: 'Primary Background', hex: '#111827', class: 'bg-gray-900' },
        { name: 'bg-gray-900 Background', hex: '#1F2937', class: 'bg-gray-900' },
        { name: 'Card/Input Background', hex: '#374151', class: 'bg-gray-700' },
        { name: 'Bright/Heading Text', hex: '#FFFFFF', class: 'text-white' },
        { name: 'Main Text', hex: '#D1D5DB', class: 'text-gray-300' },
        { name: 'Muted Text', hex: '#9CA3AF', class: 'text-gray-400' },
    ];

    const activityColors = [
        { name: 'Accent / Cardio', hex: '#2563EB', class: 'bg-blue-600' },
        { name: 'Strength', hex: '#DC2626', class: 'bg-red-600' },
        { name: 'Yoga', hex: '#16A34A', class: 'bg-green-600' },
        { name: 'Flexibility', hex: '#7C3AED', class: 'bg-purple-600' },
        { name: 'Sports', hex: '#EAB308', class: 'bg-yellow-600' },
        { name: 'Rest Day', hex: '#4B5563', class: 'bg-gray-600' },
    ];
    
    return (
        <div className="bg-gray-900 min-h-screen" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
           
            <main className="pt-24 pb-16">
                <section className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Theme & Design System</h1>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">This page documents the default colors and fonts used across the site. For a global theme change, these values can be centralized in `tailwind.config.js`.</p>
                    </div>

                    {/* Color Palette */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6">Core Color Palette</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {coreColors.map(color => (
                                 <div key={color.name}>
                                    <div className={`h-24 rounded-lg shadow-lg ${color.class.startsWith('text-') ? 'border border-gray-700 flex items-center justify-center' : color.class}`}>
                                        {color.class.startsWith('text-') && <span className={`${color.class} text-lg`}>Aa</span>}
                                    </div>
                                    <h3 className="text-white font-semibold mt-3">{color.name}</h3>
                                    <p className="text-gray-500 text-sm">Class: .{color.class}</p>
                                    <p className="text-gray-500 text-sm">Hex: {color.hex}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                     <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6">Activity & Status Colors</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {activityColors.map(color => (
                                 <div key={color.name}>
                                    <div className={`h-24 rounded-lg shadow-lg ${color.class}`}></div>
                                    <h3 className="text-white font-semibold mt-3">{color.name}</h3>
                                    <p className="text-gray-500 text-sm">Class: .{color.class}</p>
                                    <p className="text-gray-500 text-sm">Hex: {color.hex}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                     {/* Typography & Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Typography</h2>
                             <div className="space-y-4 text-gray-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                <p className="text-4xl font-bold text-white">The quick brown fox jumps over.</p>
                                <p className="text-xl text-white">The quick brown fox jumps over.</p>
                                <p>The quick brown fox jumps over.</p>
                                <p className="text-gray-400 text-sm">Font: IBM Plex Mono</p>
                            </div>
                         </div>
                         <div>
                             <h2 className="text-2xl font-bold text-white mb-6">Buttons & Interactivity</h2>
                             <div className="space-y-4">
                                <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full">Accent Button (.bg-blue-600)</button>
                                <button className="bg-gray-700 text-gray-300 font-bold py-3 px-6 rounded-lg w-full">bg-gray-900 Button (.bg-gray-700)</button>
                                <div className="bg-gray-900 p-6 rounded-lg">
                                    <p className="text-gray-300">This is a card using our <span className="text-blue-500 font-bold">bg-gray-900</span> background color.</p>
                                </div>
                             </div>
                         </div>
                    </div>

                </section>
            </main>
        </div>
    );
};


export default Style;
