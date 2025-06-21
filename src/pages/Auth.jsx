import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link from react-router-dom

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="bg-gray-900 min-h-screen flex items-center justify-center p-4 relative"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-full transition-colors duration-300"
        aria-label="Go to Homepage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8">
          <h2 className="text-white text-3xl font-bold mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 mb-8 text-center">
            {isLogin
              ? 'Sign in to access your plans.'
              : 'Get started with your fitness journey.'}
          </p>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors duration-300">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" width="48px" height="48px">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
              c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
              s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.222,0-9.651-3.657-11.303-8.653l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238
              C41.38,36.151,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-8 mb-8 flex items-center justify-center">
            <span className="border-b border-gray-600 w-1/5"></span>
            <span className="text-xs text-center text-gray-500 uppercase mx-3">Or</span>
            <span className="border-b border-gray-600 w-1/5"></span>
          </div>

          {/* Auth Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-400 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-400 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-blue-400 hover:underline ml-2"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
