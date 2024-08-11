import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link 
                    to="/home" 
                    className="hover:text-yellow-300 transition duration-300"
                >
                    Crypto Market Analysis Tool
                </Link>
            </h1>
            <nav className="flex items-center space-x-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link 
                            to="/home" 
                            className="cursor-pointer hover:text-yellow-300 hover:underline transition duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/trends" 
                            className="cursor-pointer hover:text-yellow-300 hover:underline transition duration-300"
                        >
                            Trends
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/crypto-news" 
                            className="cursor-pointer hover:text-yellow-300 hover:underline transition duration-300"
                        >
                            News
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/alerts" 
                            className="cursor-pointer hover:text-yellow-300 hover:underline transition duration-300"
                        >
                            Custom Alerts
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/profile" 
                            className="cursor-pointer hover:text-yellow-300 hover:underline transition duration-300"
                        >
                            Profile
                        </Link>
                    </li>
                    <li><Logout /></li>
                </ul>
                <ThemeToggle /> {/* Add the ThemeToggle component here */}
            </nav>
        </header>
    );
};

export default Header;
