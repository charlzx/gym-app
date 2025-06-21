import React from 'react';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {/* About Section */}
                    <div>
                        <h3 className="text-white font-bold mb-4">SMART Gym</h3>
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
                        <div className="flex space-x-4">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                title="Instagram"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>

                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                title="TikTok"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                                <FaTiktok className="w-4 h-4" />
                            </a>

                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                title="YouTube"
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                                <FaYoutube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} SMART Gym. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
