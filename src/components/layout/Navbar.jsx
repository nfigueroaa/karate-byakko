import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "relative px-4 py-2 font-medium transition-colors duration-200",
                isActive ? "text-byakko-red" : "text-gray-600 dark:text-gray-300 hover:text-byakko-black dark:hover:text-white"
            )}
        >
            {children}
            {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-byakko-red rounded-full animate-fade-in" />
            )}
        </Link>
    );
};

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-byakko-red rounded-full flex items-center justify-center text-white font-bold font-zen">
                            B
                        </div>
                        <span className="font-zen font-bold text-xl text-gray-900 dark:text-white">
                            Byakko Karate
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4">
                        <NavLink to="/">Inicio</NavLink>
                        <NavLink to="/sedes">Sedes</NavLink>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/kumite">Torneo</NavLink>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-byakko-red"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Inicio</Link>
                        <Link to="/sedes" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Sedes</Link>
                        <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
                        <Link to="/kumite" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Torneo</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
