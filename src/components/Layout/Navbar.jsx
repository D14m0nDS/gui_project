import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Switch from "./NavbarSwitch.jsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <nav className="bg-f1-red w-full fixed top-0 z-50 shadow-lg">
            <div className="bg-gray-700 w-full mx-auto sm:px-6 lg:px-3">
                <div className="flex items-center h-16">
                    <div className="flex">
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
                            className="text-red-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
