import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
  { label: "Timetable", href: "/timetablepg", type: "anchor" },
  { label: "Instructors", href: "/instructorspg", type: "anchor" },
  { label: "Tracker", href: "/tracker", type: "route", isNew: true },
  // { label: "Planner", href: "/planner", type: "route" },
  { label: "Tools", href: "/tools", type: "route" },
  { label: "Analytics", href: "/analytics", type: "route" },
  { label: "Membership", href: "/membership", type: "route" },
  { label: "Log In", href: "/auth", type: "route" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  const renderLink = (link, index) => {
    const activeClass = isActive(link.href)
      ? 'text-blue-400 font-bold'
      : 'text-gray-300 hover:text-blue-400';

    return (
      <Link
        key={index}
        to={link.href}
        className={`transition duration-300 relative py-2 ${activeClass}`}
      >
        {link.label}
        {link.isNew && (
          <span className="absolute top-1 right-[-15px] flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        )}
      </Link>
    );
  };

  return (
    <header className="bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-wider flex items-center">
          <img src={logo} alt="Logo" style={{ height: '25px', backgroundColor: '#fff', marginRight: '5px' }} />
          SMART
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
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
        className={`fixed top-0 left-0 right-0 bg-gray-900 z-50 transform transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'h-screen opacity-100' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-white text-2xl font-bold">
            <Link to="/" className="flex items-center text-white tracking-wider">
              <img src={logo} alt="Logo" style={{ height: '25px', backgroundColor: '#fff', marginRight: '5px' }} />
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

        {/* Mobile Nav Items */}
        <div className="flex flex-col items-center justify-center space-y-8 mt-12 text-white text-xl">
          {navLinks.map((link, index) => {
            const isActiveMobile = isActive(link.href);
            return (
              <Link
                key={index}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`transition duration-300 ${isActiveMobile ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}`}
              >
                <span className="relative">
                  {link.label}
                  {link.isNew && (
                    <span className="absolute top-[-8px] right-[-35px] text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-1 rounded-md">
                      NEW
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
