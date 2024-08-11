import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">
                <Link to="/home">Crypto Market Analysis Tool</Link>
            </h1>
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-white">
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
                </button>
            </div>
            <nav
                className={`fixed top-0 right-0 h-full bg-blue-700 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 w-48 lg:relative lg:w-auto lg:bg-transparent lg:transform-none lg:transition-none lg:h-auto`}
            >
                <div className="flex justify-end p-2 lg:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>
                <ul className="flex flex-col lg:flex-row lg:space-x-4 p-6 lg:p-0 text-sm">
                    <li className="mb-4 lg:mb-0">
                        <Link to="/home" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="mb-4 lg:mb-0">
                        <Link to="/trends" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Trends
                        </Link>
                    </li>
                    <li className="mb-4 lg:mb-0">
                        <Link to="/crypto-news" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            News
                        </Link>
                    </li>
                    <li className="mb-4 lg:mb-0">
                        <Link to="/alerts" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Custom Alerts
                        </Link>
                    </li>
                    <li className="mb-4 lg:mb-0">
                        <Link to="/profile" className="cursor-pointer block py-2 lg:py-0 text-white hover:text-gray-300" onClick={toggleMenu}>
                            Profile
                        </Link>
                    </li>
                    <li className="mb-4 lg:mb-0">
                        <Logout />
                    </li>
                </ul>
                <ThemeToggle /> {/* Add the ThemeToggle component here */}
            </nav>
        </header>
    );
};

export default Header;
