import instructorsData from '../data/instructorsData';

const Instructors = () => {
    return (
        <section id="instructors" className="py-16 sm:py-24 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Expert Trainers</h2>
                    <p className="text-gray-400 mt-2">Certified professionals dedicated to your success.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {instructorsData.map(inst => (
                        <div
                            key={inst.name}
                            className="group relative rounded-lg overflow-hidden shadow-lg transform-gpu transition duration-500 hover:scale-105 hover:-rotate-1"
                        >
                            <img
                                src={inst.img}
                                alt={`Instructor ${inst.name}`}
                                className="w-full h-96 object-cover transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                                <div className="instructor-card-content w-full text-left">
                                    <div className="bottom-4 left-4 opacity-100 transform translate-y-[4.5rem] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <h3 className="text-2xl font-bold text-white"
                                        >{inst.name}</h3>
                                        <p className="text-blue-400 font-semibold">{inst.title}</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                                        
                                        <p className="text-gray-300 text-sm mt-1">{inst.specialty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Instructors;
