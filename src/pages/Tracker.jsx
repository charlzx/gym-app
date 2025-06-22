import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Workout Log Modal --- (unchanged)

const WorkoutLogModal = ({ date, workout, onClose, onSave, onDelete }) => {
    const [type, setType] = useState(workout ? workout.type : 'Strength');
    const [duration, setDuration] = useState(workout ? workout.duration : '');

    const handleSave = () => {
        if (duration > 0 || type === 'Rest Day') {
            onSave({ type, duration: type === 'Rest Day' ? 0 : duration });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">
                        {workout ? 'Edit Workout' : 'Log Workout'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                <p className="text-blue-400 font-semibold mb-4 text-sm">
                    {date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Workout Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Strength</option>
                            <option>Cardio</option>
                            <option>Yoga</option>
                            <option>Flexibility</option>
                            <option>Sports</option>
                            <option>Rest Day</option>
                        </select>
                    </div>
                    {type !== 'Rest Day' && (
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., 60"
                                required
                            />
                        </div>
                    )}
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        {workout ? 'Save Changes' : 'Save Workout'}
                    </button>
                    {workout && (
                        <button
                            onClick={onDelete}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Tracker Page ---

const WorkoutTrackerPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loggedWorkouts, setLoggedWorkouts] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const savedWorkouts = localStorage.getItem('gym-workouts');
        if (savedWorkouts) {
            setLoggedWorkouts(JSON.parse(savedWorkouts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('gym-workouts', JSON.stringify(loggedWorkouts));
    }, [loggedWorkouts]);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = startOfMonth.getDay();

    const days = Array.from({ length: firstDayOfWeek + daysInMonth }, (_, i) => {
        if (i < firstDayOfWeek) return null;
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), i - firstDayOfWeek + 1);
    });

    const changeMonth = (offset) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const handleSaveWorkout = (data) => {
        const key = selectedDate.toISOString().split('T')[0];
        setLoggedWorkouts(prev => ({ ...prev, [key]: data }));
        setSelectedDate(null);
    };

    const handleDeleteWorkout = () => {
        const key = selectedDate.toISOString().split('T')[0];
        const updated = { ...loggedWorkouts };
        delete updated[key];
        setLoggedWorkouts(updated);
        setSelectedDate(null);
    };

    const workoutTypeColors = {
        Strength: 'bg-red-600',
        Cardio: 'bg-blue-600',
        Yoga: 'bg-green-600',
        Flexibility: 'bg-purple-600',
        Sports: 'bg-yellow-600',
        'Rest Day': 'bg-gray-600',
    };

    return (
        <div className="bg-gray-900 min-h-screen" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <Header />
            <main className="pt-24 pb-16">
                <section className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Workout Tracker</h1>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                            Log your sessions, track your consistency, and stay motivated. Click on a day to log your workout.
                        </p>
                    </div>

                    <div className="mx-auto bg-gray-800 rounded-lg shadow-2xl p-4 sm:p-6 max-w-full overflow-x-auto">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-700 text-white">&larr;</button>
                            <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
                                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h2>
                            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-700 text-white">&rarr;</button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="font-bold text-gray-400 uppercase tracking-wider py-2">{day}</div>
                            ))}
                            {days.map((d, index) => {
                                if (!d) return <div key={`empty-${index}`} className="h-16 sm:h-24" />;
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const isToday = d.getTime() === today.getTime();
                                const isFuture = d > today;
                                const isCurrentMonth = d.getMonth() === currentDate.getMonth();
                                const dateKey = d.toISOString().split('T')[0];
                                const workout = loggedWorkouts[dateKey];

                                const baseBg = workout ? workoutTypeColors[workout.type] : isCurrentMonth ? 'bg-gray-800' : 'bg-gray-900';
                                const textColor = isCurrentMonth ? 'text-white' : 'text-gray-600';

                                return (
                                    <div
                                        key={d.toISOString()}
                                        className={`relative h-16 sm:h-24 p-1 sm:p-2 border border-gray-700/50 rounded-md transition-colors
                                            ${isFuture ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 cursor-pointer'} ${baseBg}`}
                                        onClick={() => !isFuture && setSelectedDate(d)}
                                    >
                                        <div className={`relative inline-block w-6 h-6 sm:w-8 sm:h-8 ${isToday ? 'animate-pulse' : ''}`}>
                                            {isToday && (
                                                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-lg"></span>
                                            )}
                                            <span className={`relative z-10 text-sm sm:text-lg font-bold w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : textColor}`}>
                                                {d.getDate()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 pt-4 border-t border-gray-700 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm">
                            {Object.entries(workoutTypeColors).map(([type, colorClass]) => (
                                <div key={type} className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                                    <span className="text-gray-400">{type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            {selectedDate && (
                <WorkoutLogModal
                    date={selectedDate}
                    workout={loggedWorkouts[selectedDate.toISOString().split('T')[0]]}
                    onClose={() => setSelectedDate(null)}
                    onSave={handleSaveWorkout}
                    onDelete={handleDeleteWorkout}
                />
            )}
        </div>
    );
};

export default WorkoutTrackerPage;
