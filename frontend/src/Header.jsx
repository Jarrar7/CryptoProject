import React from 'react';

const Header = ({ theme, setTheme }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Crypto Market Analysis Tool</h1>
      <nav>
        <ul className="flex space-x-4">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Trends Analysis</li>
          <li className="cursor-pointer">Market Sentiment</li>
          <li className="cursor-pointer">Custom Alerts</li>
          <li className="cursor-pointer">Profile</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
