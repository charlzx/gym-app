import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 bg-gray-800">
      <h3 className="text-3xl font-bold text-center mb-6">Contact Us</h3>
      <form className="max-w-xl mx-auto space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 rounded bg-gray-700 text-white" />
        <input type="email" placeholder="Email" className="w-full p-2 rounded bg-gray-700 text-white" />
        <textarea placeholder="Message" rows="4" className="w-full p-2 rounded bg-gray-700 text-white"></textarea>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-medium">Send</button>
      </form>
    </section>
  );
}
