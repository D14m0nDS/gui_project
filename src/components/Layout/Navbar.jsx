import { Link } from 'react-router-dom';
import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/../../src/assets/logo.png"
                                className="h-8 w-auto"
                                alt="F1 Logo"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                            to="/"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Races
                        </Link>
                        <Link
                            to="/drivers"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Drivers
                        </Link>
                        <Link
                            to="/constructors"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Constructors
                        </Link>
                        <Link
                            to="/standings"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Standings
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
