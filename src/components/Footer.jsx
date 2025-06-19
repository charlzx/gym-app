import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white font-bold mb-4">SAMPLE Gym</h3>
                        <p className="text-sm">
                            Our mission is to provide a world-class fitness environment that supports the health and wellness of our community.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Fitness Articles</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Workout Guides</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Nutrition Tips</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Member Portal</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4 mb-4">
                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"
                                className="text-gray-400 hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok"
                                className="text-gray-400 hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02..." />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube"
                                className="text-gray-400 hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136..." />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} SAMPLE Gym. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
