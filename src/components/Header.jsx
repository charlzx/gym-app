import React from 'react';
import { navLinks } from '../data/navLinks';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow">
      <nav className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-white">GymPro</h1>
        <ul className="flex space-x-6 text-sm">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-yellow-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}