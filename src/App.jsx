import React from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Timetable from './components/Timetable';
import Instructors from './components/Instructors';
import AIPlanner from './components/AIPlanner';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-900 text-gray-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Header />
      <main className="pt-16">
        <Hero />
        <Timetable />
        <Instructors />
        <AIPlanner />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}