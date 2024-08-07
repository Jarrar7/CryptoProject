import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link to="/home">Crypto Market Analysis Tool</Link>
            </h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/home" className="cursor-pointer">Home</Link>
                    </li>
                    <li>
                        <Link to="/trends" className="cursor-pointer">Trends</Link>
                    </li>
                    <li>
                        <Link to="/crypto-news" className="cursor-pointer">News</Link>
                    </li>
                    <li>
                        <Link to="/alerts" className="cursor-pointer">Custom Alerts</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="cursor-pointer">Profile</Link>
                    </li>
                    <li><Logout /></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
