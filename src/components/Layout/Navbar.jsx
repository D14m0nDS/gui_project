import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Switch from "./NavbarSwitch.jsx"; // Import the Switch component

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo (Commented out as per your request) */}
                    {/* <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/../../src/assets/logo.png"
                                className="h-8 w-auto"
                                alt="F1 Logo"
                            />
                        </Link>
                    </div> */}

                    {/* Button to toggle navbar (using the custom Switch component) */}
                    <div className="flex md:hidden">
                        <Switch isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>

            {/* Collapsed Mobile Menu */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Races
                        </Link>
                        <Link
                            to="/drivers"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Drivers
                        </Link>
                        <Link
                            to="/constructors"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Constructors
                        </Link>
                        <Link
                            to="/standings"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Standings
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
