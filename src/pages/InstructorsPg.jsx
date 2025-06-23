import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import instructors from '../data/instructorsData';

const BookingModal = ({ onClose, instructorName }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Book a Session with {instructorName}</h3>
            <p className="text-gray-300 mb-6">This feature is coming soon! Our online booking portal will allow you to schedule one-on-one sessions with our trainers.</p>
            <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">Got it</button>
        </div>
    </div>
);

const InstructorGridCard = ({ inst, onBookSession }) => (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-full">
        <img src={inst.img} alt={inst.name} className="w-full h-80 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-blue-400 font-semibold text-sm">{inst.title}</p>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">{inst.name}</h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">{inst.bio}</p>
            <div className="mb-4">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                    {inst.specialties.map(spec => (
                        <span key={spec} className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">{spec}</span>
                    ))}
                </div>
            </div>
            <button onClick={() => onBookSession(inst.name)} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full mt-auto">
                Book a Session
            </button>
        </div>
    </div>
);

const InstructorSwipeCard = ({ inst, onBookSession }) => (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-135 relative text-white">
        <img src={inst.img} alt={inst.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        <div className="p-6 flex flex-col flex-grow justify-end relative">
            <p className="text-blue-400 font-semibold text-sm">{inst.title}</p>
            <h3 className="text-3xl font-bold text-white mt-1 mb-3">{inst.name}</h3>
            <div className="mb-4">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                    {inst.specialties.map(spec => (
                        <span key={spec} className="bg-white/10 backdrop-blur-sm text-gray-200 text-xs font-semibold px-3 py-1 rounded-full">{spec}</span>
                    ))}
                </div>
            </div>
            <button onClick={() => onBookSession(inst.name)} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full mt-4">
                Book a Session
            </button>
        </div>
    </div>
);

const InstructorCardStack = ({ onBookSession }) => {
    const [stack, setStack] = useState(instructors);
    const [dragging, setDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const SWIPE_THRESHOLD = 120;

    const handlePointerDown = (e) => {
        setStartPos({ x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY });
        setDragging(true);
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;
        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;
        setDragPos({
            x: currentX - startPos.x,
            y: currentY - startPos.y
        });
    };

    const handlePointerUp = () => {
        setDragging(false);
        if (Math.abs(dragPos.x) > SWIPE_THRESHOLD) {
            const direction = dragPos.x > 0 ? 1 : -1;
            setDragPos(prev => ({ ...prev, x: direction * 1000 }));
            setTimeout(() => {
                const newStack = [...stack];
                const swipedCard = newStack.shift();
                newStack.push(swipedCard);
                setStack(newStack);
                setDragPos({ x: 0, y: 0 });
            }, 300);
        } else {
            setDragPos({ x: 0, y: 0 });
        }
    };

    return (
        <div
            className="relative w-full h-[550px] max-w-sm mx-auto cursor-grab"
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {stack.map((inst, index) => {
                const isTopCard = index === 0;
                const transform = isTopCard
                    ? `translate(${dragPos.x}px, ${dragPos.y}px) rotate(${dragPos.x / 10}deg)`
                    : `scale(${1 - (index * 0.05)}) translateY(-${index * 20}px)`;
                const transition = isTopCard && !dragging ? 'transform 0.3s ease-out' : 'none';

                return (
                    <div
                        key={inst.name + index}
                        className="absolute w-full h-full"
                        style={{
                            transform,
                            transition,
                            zIndex: stack.length - index,
                            touchAction: 'none'
                        }}
                        onPointerDown={isTopCard ? handlePointerDown : undefined}
                        onPointerMove={isTopCard ? handlePointerMove : undefined}
                    >
                        <InstructorSwipeCard inst={inst} onBookSession={onBookSession} />
                    </div>
                );
            })}
        </div>
    );
};

const InstructorsPage = () => {
    const [bookingModal, setBookingModal] = useState({ isOpen: false, instructorName: '' });

    const handleBookSession = (name) => {
        setBookingModal({ isOpen: true, instructorName: name });
    };

    return (
        <div className="bg-gray-900" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <Header />
            <main className="pt-24 pb-16">
                <section className="text-center mb-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Meet Our World-Class Team</h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The heart of our gym. These are the certified professionals dedicated to pushing you to your limits and helping you achieve your goals.</p>
                </section>

                <section className="container mx-auto px-6">
                    <div className="md:hidden">
                        <p className="text-center text-gray-500 text-sm mb-4">(Swipe to browse instructors)</p>
                        <InstructorCardStack onBookSession={handleBookSession} />
                    </div>
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {instructors.map((inst) => (
                            <InstructorGridCard key={inst.name} inst={inst} onBookSession={handleBookSession} />
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-6 mt-20 md:mt-24">
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <h2 className="text-3xl font-bold text-white">Want to Join Our Team?</h2>
                        <p className="text-gray-400 mt-2 mb-6 max-w-xl mx-auto">We're always looking for passionate, certified fitness professionals to join the SMART family. If you have what it takes, we'd love to hear from you.</p>
                        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                            View Openings
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
            {bookingModal.isOpen && (
                <BookingModal
                    onClose={() => setBookingModal({ isOpen: false, instructorName: '' })}
                    instructorName={bookingModal.instructorName}
                />
            )}
        </div>
    );
};

export default InstructorsPage;
