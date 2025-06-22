import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const classData = {
    'Sunrise Yoga': { description: 'Start your day with energizing yoga flows that build strength and flexibility as the sun rises. Suitable for all levels.', intensity: 'Low', instructor: 'John S.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Sunrise+Yoga', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=JS' },
    'Power HIIT': { description: 'A high-intensity interval training session designed to maximize calorie burn, boost metabolism, and improve cardiovascular health. Expect a challenge!', intensity: 'High', instructor: 'Emily W.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Power+HIIT', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=EW' },
    'Core & Flow': { description: 'A fusion of Pilates and yoga, this class focuses on building a strong core and improving overall body stability and balance.', intensity: 'Medium', instructor: 'John S.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Core+%26+Flow', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=JS' },
    'Spin Cycle': { description: 'An upbeat indoor cycling class with high-energy music. Get ready to sweat, climb hills, and sprint to the finish line.', intensity: 'High', instructor: 'Emily W.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Spin+Cycle', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=EW' },
    'Powerlifting': { description: 'Focus on the big three lifts: squat, bench, and deadlift. This class is for those looking to build serious strength under expert guidance.', intensity: 'High', instructor: 'Jane D.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Powerlifting', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=JD' },
    'Weekend Warrior': { description: 'A challenging, full-body workout to kickstart your weekend. Combines elements of strength, cardio, and functional fitness.', intensity: 'High', instructor: 'Emily W.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Weekend+Warrior', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=EW' },
    'Zumba': { description: 'Ditch the workout, join the party! A fun, high-energy dance fitness class with Latin-inspired moves.', intensity: 'Medium', instructor: 'Guest', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Zumba', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=Guest' },
    'Yoga Flow': { description: 'Unwind and de-stress with this Vinyasa-style yoga class that links movement with breath. Perfect for improving flexibility and mindfulness.', intensity: 'Low', instructor: 'John S.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Yoga+Flow', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=JS' },
    'Relax & Restore': { description: 'A gentle, restorative yoga class using props to support the body in deep stretches. Ideal for recovery and stress relief.', intensity: 'Low', instructor: 'John S.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Relax+%26+Restore', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=JS' },
    'Night Ride': { description: 'End your day with a powerful indoor cycling session set to a rhythm-driven playlist under ambient lighting.', intensity: 'High', instructor: 'Emily W.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Night+Ride', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=EW' },
    'Evening HIIT': { description: 'A final burst of energy for the day. This HIIT class will challenge you and leave you feeling accomplished.', intensity: 'High', instructor: 'Jane D.', img: 'https://placehold.co/600x400/1F2937/FFFFFF?text=Evening+HIIT', instructorImg: 'https://placehold.co/100x100/1F2937/FFFFFF?text=JD' },
};

const timetableData = [
    { time: '6:00 AM', classes: ['Sunrise Yoga', 'Power HIIT', 'Core & Flow', 'Power HIIT', 'Sunrise Yoga', 'Open Gym'], types: ['yoga', 'cardio', 'strength', 'cardio', 'yoga', 'gym'], intensities: ['Low', 'High', 'Medium', 'High', 'Low', ''] },
    { time: '9:00 AM', classes: ['Open Gym', 'Spin Cycle', 'Open Gym', 'Spin Cycle', 'Open Gym', 'Weekend Warrior'], types: ['gym', 'cardio', 'gym', 'cardio', 'gym', 'cardio'], intensities: ['', 'High', '', 'High', '', 'High'] },
    { time: '5:00 PM', classes: ['Powerlifting', 'Zumba', 'Yoga Flow', 'Zumba', 'Powerlifting', 'Relax & Restore'], types: ['strength', 'cardio', 'yoga', 'cardio', 'strength', 'yoga'], intensities: ['High', 'Medium', 'Low', 'Medium', 'High', 'Low'] },
    { time: '7:00 PM', classes: ['Evening HIIT', 'Open Gym', 'Night Ride', 'Open Gym', 'Evening HIIT', 'Open Gym'], types: ['cardio', 'gym', 'cardio', 'gym', 'cardio', 'gym'], intensities: ['High', '', 'High', '', 'High', ''] },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// --- Sub-Components ---

const ClassDetailsModal = ({ className, data, onClose, onBook }) => {
    if (!className || !data) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full relative text-center">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="flex flex-col items-center">
                    <img src={data.instructorImg} alt={data.instructor} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"/>
                    <h3 className="text-3xl font-bold text-white mb-2">{className}</h3>
                     <p className="text-gray-300 mb-4">with {data.instructor}</p>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full mb-4 inline-block ${data.intensity === 'High' ? 'bg-red-500 text-white' : data.intensity === 'Medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'}`}>
                        {data.intensity} Intensity
                    </span>
                    <p className="text-gray-400 mt-4">{data.description}</p>
                    <button onClick={onBook} className="bg-blue-600 w-full mt-8 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Book Your Spot
                    </button>
                </div>
            </div>
        </div>
    );
};

const BookingModal = ({ onClose }) => (
     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Feature Coming Soon!</h3>
            <p className="text-gray-300 mb-6">Online booking will be available once our new member portal launches. For now, please book at the front desk!</p>
            <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">Got it</button>
        </div>
    </div>
);

const ClassOfTheWeek = () => {
    const featuredClass = 'Power HIIT';
    const data = classData[featuredClass];

    return (
        <div className="mt-24" id="class-of-the-week">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Class of the Week</h2>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden md:flex">
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full mb-4 inline-block self-start ${data.intensity === 'High' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                        {data.intensity} Intensity
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-4">{featuredClass}</h3>
                    <p className="text-gray-400 mb-6">{data.description}</p>
                    <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg self-start hover:bg-blue-700 transition-colors">
                        Book Your Spot
                    </button>
                </div>
            </div>
        </div>
    );
}

const GymEtiquette = () => {
     const rules = [
        { icon: '🔄', title: 'Rerack Weights', text: 'Put equipment back where you found it. Keep the gym tidy for everyone.' },
        { icon: '🧼', title: 'Wipe It Down', text: 'Please wipe down benches and machines after use. Sanitizer is available.' },
        { icon: '📱', title: 'Phone Calls Outside', text: 'Keep the workout floor a focused zone. Please take calls in the lobby.' },
        { icon: '🤝', title: 'Share Equipment', text: 'Be mindful of others. Allow others to work in between your sets during busy hours.' },
    ];
    
     return (
        <div className="mt-24" id="first-class-tips">
             <h2 className="text-3xl font-bold text-white text-center mb-12">Our Gym Etiquette</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {rules.map(rule => (
                    <div key={rule.title} className="bg-gray-800 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-4">{rule.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{rule.title}</h3>
                        <p className="text-gray-400 text-sm">{rule.text}</p>
                    </div>
                ))}
             </div>
        </div>
    )
}

const FindYourClassWizard = ({ onFilterChange }) => {
    const [goal, setGoal] = useState('');
    const [vibe, setVibe] = useState('');
    const [recommendation, setRecommendation] = useState('');
    
    const getRecommendation = () => {
        if (!goal || !vibe) return;

        let classType = 'cardio';
        let recommendationText = "For a high-energy cardio boost, try a HIIT or Spin class!";
        if (goal === 'strength') {
            classType = 'strength';
            recommendationText = "To build pure strength, Powerlifting is the way to go. We've highlighted it below!";
        }
        if (goal === 'flexibility') {
            classType = 'yoga';
            recommendationText = "For flexibility and focus, you'll love our Yoga classes. Check them out!";
        }
        
        onFilterChange({ target: { name: 'type', value: classType } });
        setRecommendation({type: classType.replace('-', ' '), text: recommendationText});
    };
    
    return(
        <div className="bg-gray-800 rounded-lg p-8 mb-16 shadow-2xl border-t-4 border-blue-500">
            <h2 className="text-3xl font-bold text-white text-center mb-2">Find Your Perfect Class</h2>
            <p className="text-gray-400 text-center mb-8">Answer two simple questions to get a recommendation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-gray-300 font-semibold mb-2">What is your primary goal?</label>
                    <select onChange={(e) => setGoal(e.target.value)} value={goal} className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a goal...</option>
                        <option value="strength">Build Strength</option>
                        <option value="cardio">Improve Cardio</option>
                        <option value="flexibility">Increase Flexibility</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-300 font-semibold mb-2">What's your preferred vibe?</label>
                     <select onChange={(e) => setVibe(e.target.value)} value={vibe} className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a vibe...</option>
                        <option value="high-energy">High Energy</option>
                        <option value="calm">Calm & Focused</option>
                    </select>
                </div>
            </div>
             <div className="text-center mt-8">
                <button onClick={getRecommendation} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-500" disabled={!goal || !vibe}>
                    Get Recommendation
                </button>
             </div>
             {recommendation && (
                <div className="mt-6 bg-green-900/50 border border-green-500/50 text-green-300 p-4 rounded-lg text-center">
                    <p className="font-bold">Our Recommendation: {recommendation.type}</p>
                    <p className="text-sm">{recommendation.text}</p>
                </div>
             )}
        </div>
    );
};

// --- Main Timetable Page Component ---

const TimetablePage = () => {
    const [filter, setFilter] = useState({ type: 'all', time: 'all', intensity: 'all' });
    const [selectedClass, setSelectedClass] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const handleClassClick = (className) => {
        if (className !== 'Open Gym') {
            setSelectedClass(className);
        }
    };

    const handleBookNow = () => {
        setSelectedClass(null); // Close details modal
        setShowBookingModal(true); // Open booking modal
    };

    const isVisible = (classType, classTime, classIntensity) => {
        const typeMatch = filter.type === 'all' || filter.type === classType;
        const intensityMatch = filter.intensity === 'all' || filter.intensity === classIntensity;
        
        const hour = parseInt(classTime.split(':')[0]);
        const period = classTime.includes('AM') ? 'am' : 'pm';
        
        let timeMatch = false;
        if (filter.time === 'all') {
            timeMatch = true;
        } else if (filter.time === 'morning' && period === 'am') {
            timeMatch = true;
        } else if (filter.time === 'afternoon' && period === 'pm' && hour < 7) {
            timeMatch = true;
        } else if (filter.time === 'evening' && period === 'pm' && hour >= 7) {
            timeMatch = true;
        }
        
        return typeMatch && timeMatch && intensityMatch;
    };
    
    const printSchedule = () => {
        window.print();
    };

    return (
        <div className="bg-gray-900" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
             <Header />
             <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #printable-schedule, #printable-schedule * {
                            visibility: visible;
                        }
                        #printable-schedule {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                        #printable-schedule h2 {
                            color: black;
                        }
                        #printable-schedule table {
                             color: black;
                             background-color: white !important;
                        }
                         #printable-schedule th, #printable-schedule td {
                            border: 1px solid #ccc;
                         }
                         #printable-schedule thead {
                            background-color: #eee !important;
                         }
                    }
                `}
            </style>
            <section id="timetable-page" className="py-16 sm:py-24">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">Class Schedule</h1>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Find your next favorite class. Filter by type and time to see what fits your schedule and goals.</p>
                    </div>
                    
                    <FindYourClassWizard onFilterChange={handleFilterChange} />

                    {/* Filter Controls */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                        <select name="type" id="type-filter" value={filter.type} onChange={handleFilterChange} className="w-full sm:w-auto px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Class Types</option>
                            <option value="yoga">Yoga</option>
                            <option value="cardio">Cardio & HIIT</option>
                            <option value="strength">Strength</option>
                        </select>
                        <select name="intensity" id="intensity-filter" value={filter.intensity} onChange={handleFilterChange} className="w-full sm:w-auto px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Intensities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select name="time" id="time-filter" value={filter.time} onChange={handleFilterChange} className="w-full sm:w-auto px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Times</option>
                            <option value="morning">Morning (6am-12pm)</option>
                            <option value="afternoon">Afternoon (12pm-7pm)</option>
                            <option value="evening">Evening (7pm-onwards)</option>
                        </select>
                         <button onClick={printSchedule} className="text-white bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print
                         </button>
                    </div>

                    {/* Timetable Grid */}
                    <div id="printable-schedule" className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold text-center py-4 hidden print:block">Weekly Class Schedule</h2>
                        <table className="w-full text-sm text-center text-gray-300">
                            <thead className="text-xs text-white uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Time</th>
                                    {daysOfWeek.map(day => <th key={day} scope="col" className="px-6 py-4">{day}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {timetableData.map((row, rowIndex) => (
                                    <tr key={row.time} className={`${rowIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/50'}`}>
                                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{row.time}</th>
                                        {row.classes.map((className, classIndex) => {
                                            const isClassVisible = isVisible(row.types[classIndex], row.time, row.intensities[classIndex]);
                                            const isClickable = className !== 'Open Gym';
                                            return (
                                                <td key={classIndex}
                                                    onClick={() => isClickable && handleClassClick(className)}
                                                    className={`px-6 py-4 border-b border-gray-700 transition-opacity duration-300
                                                        ${isClassVisible ? 'opacity-100' : 'opacity-30'}
                                                        ${isClickable ? 'cursor-pointer hover:bg-blue-900/50 font-semibold text-blue-300' : 'text-gray-500'}
                                                    `}>
                                                    {className}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <ClassOfTheWeek />
                    <GymEtiquette />
                </div>
            </section>
            
            <ClassDetailsModal className={selectedClass} data={classData[selectedClass]} onClose={() => setSelectedClass(null)} onBook={handleBookNow} />
            {showBookingModal && <BookingModal onClose={() => setShowBookingModal(false)} />}

            <Footer />
        </div>
    );
};


export default TimetablePage;

