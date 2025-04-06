import { Link } from 'react-router-dom';

export default function MobileSidebar({ isOpen, onClose }) {
    return (
        <div className={`fixed inset-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 md:hidden"
                onClick={onClose}
            />

            {/* Sidebar Content */}
            <div className="relative z-50 h-full w-64 bg-gray-800 border-r border-gray-700">
                <div className="flex flex-col h-full">
                    {/* Header with Switch */}
                    <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
                        <div className="flex items-center">
                            <span className="text-white text-xl font-bold">F1 Menu</span>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg"
                                    onClick={onClose}
                                >
                                    Races
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/drivers"
                                    className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg"
                                    onClick={onClose}
                                >
                                    Drivers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/constructors"
                                    className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg"
                                    onClick={onClose}
                                >
                                    Constructors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/standings"
                                    className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg"
                                    onClick={onClose}
                                >
                                    Standings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}