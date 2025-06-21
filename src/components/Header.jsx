import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  { label: "Timetable", href: "#timetable", type: "anchor" },
  { label: "Instructors", href: "#instructors", type: "anchor" },
  { label: "Planner", href: "/planner", type: "route" },
  { label: "Membership", href: "/membership", type: "route" },
  { label: "Log In", href: "/auth", type: "route" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderLink = (link, index) => {
    const commonClasses = "text-gray-300 hover:text-blue-400 transition duration-300";
    return link.type === "route" ? (
      <Link key={index} to={link.href} className={commonClasses}>
        {link.label}
      </Link>
    ) : (
      <a key={index} href={link.href} className={commonClasses}>
        {link.label}
      </a>
    );
  };

  return (
    <header className="bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-wider flex">
        <img src={logo} alt="Logo" style={{height: '25px', backgroundColor: '#fff', marginRight: '5px'}}/>
        SMART 
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map(renderLink)}
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white focus:outline-none"
            aria-label="Open Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bg-gray-900 z-50 transform transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'h-screen opacity-100' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-white text-2xl font-bold">
            <Link to="/" className="text-2xl font-bold text-white tracking-wider flex">
              <img src={logo} alt="Logo" style={{height: '25px', backgroundColor: '#fff', marginRight: '5px'}}/>
              SMART 
            </Link>
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-blue-500 transition"
            aria-label="Close Menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 mt-12 text-white text-xl">
          {navLinks.map((link, index) => (
            link.type === 'route' ? (
              <Link key={index} to={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition duration-300">
                {link.label}
              </Link>
            ) : (
              <a key={index} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400 transition duration-300">
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
