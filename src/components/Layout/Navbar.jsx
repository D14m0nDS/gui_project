import { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from "./NavbarSwitch.jsx";
import MobileSidebar from "./MobileSidebar.jsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="bg-f1-red fixed w-full top-0 z-51 shadow-lg">
                <div className="bg-gray-800 mx-auto px-4 sm:px-6 lg:px-3">
                    <div className="flex items-center justify-between h-16">
                        {/* Switch Button - always visible */}
                        <div className="flex items-center">
                            <Switch
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                className="hover:bg-gray-600 rounded"
                            />
                        </div>

                        {/* Desktop Menu - pushed to right */}
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                                Races
                            </Link>
                            <Link to="/drivers" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                                Drivers
                            </Link>
                            <Link to="/constructors" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                                Constructors
                            </Link>
                            <Link to="/standings" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                                Standings
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

            {/* Content Spacer */}
            <div className="h-16
            " />
        </>
    );
}