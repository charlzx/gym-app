import React from 'react';

export default function Footer() {
  return (
    <footer className="py-4 text-center bg-gray-900 border-t border-gray-700">
      <p className="text-sm">&copy; {new Date().getFullYear()} GymPro. All rights reserved.</p>
    </footer>
  );
}