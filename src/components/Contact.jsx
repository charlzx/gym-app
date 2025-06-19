import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="py-16 sm:py-24 bg-gray-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h2>
                    <p className="text-gray-400 mt-2">We're here to help. Reach out or visit us.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Location Map */}
                    <div className="bg-gray-900 p-8 rounded-lg shadow-lg h-full">
                        <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
                        <div className="rounded-lg overflow-hidden">
                            <iframe
                                title="Gym Location"
                                aria-label="Map showing gym location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.216398030223!2d-73.98823932338945!3d40.75734493484217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c643422d%3A0x835a3053b6cb3fa4!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1718628383307!5m2!1sen!2sus"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your Name"
                                    autoComplete="name"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    placeholder="Your message..."
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg w-full transition duration-300"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
