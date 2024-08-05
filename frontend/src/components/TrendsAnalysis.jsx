// src/components/TrendsAnalysis.jsx

import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import the Header component

const TrendsAnalysis = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("wss://mtickers.mtw-testnet.com/");

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log('Received data:', data);

        // Simulate data sorting into gainers and losers
        setCryptoData(Object.entries(data).map(([symbol, info]) => ({
          symbol,
          change: parseFloat(info.c),
          price: parseFloat(info.p),
        })).sort((a, b) => b.change - a.change));
      } catch (error) {
        console.error('Error parsing message data:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Assuming first 3 are gainers and last 3 are losers for demonstration
  const gainers = cryptoData.slice(0, 3);
  const losers = cryptoData.slice(-3);

  return (
    <div>
      <Header /> {/* Add the Header component here */}
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Trends Analysis</h2>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-green-500">Gainers</h3>
          <ul>
            {gainers.map((crypto, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex justify-between items-center">
                <span>{crypto.symbol}</span>
                <span style={{ color: 'green' }}>Change: {crypto.change}%</span>
                <span>Last Price: ${crypto.price}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold text-red-500 mt-8">Losers</h3>
          <ul>
            {losers.map((crypto, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex justify-between items-center">
                <span>{crypto.symbol}</span>
                <span style={{ color: 'red' }}>Change: {crypto.change}%</span>
                <span>Last Price: ${crypto.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrendsAnalysis;
