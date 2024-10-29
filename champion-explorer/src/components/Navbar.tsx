import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-gray-300">
          Champion Explorer
        </Link>

        <div className="flex gap-4">
          <Link
            to="/"
            className={`hover:text-gray-300 ${
              location.pathname === '/' ? 'text-blue-400' : ''
            }`}
          >
            Champions
          </Link>
          <Link
            to="/create-build"
            className={`hover:text-gray-300 ${
              location.pathname === '/create-build' ? 'text-blue-400' : ''
            }`}
          >
            Create Build
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
