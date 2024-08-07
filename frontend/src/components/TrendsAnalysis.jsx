import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import the Header component
const API_URL = process.env.REACT_APP_API_URL;

const TrendsAnalysis = () => {
    const [cryptoData, setCryptoData] = useState({ gainers: [], losers: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/TrendsAnalysis`);
                const data = await response.json();

                // Separate gainers and losers
                const gainers = data.filter(crypto => crypto.change > 0);
                const losers = data.filter(crypto => crypto.change < 0);

                setCryptoData({ gainers, losers });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Header /> {/* Add the Header component here */}
            <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Trends Analysis</h2>
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-green-500">Gainers</h3>
                    <ul>
                        {cryptoData.gainers.map((crypto, index) => (
                            <li key={index} className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex justify-between items-center">
                                <span>{crypto.symbol}</span>
                                <span style={{ color: 'green' }}>Change: {crypto.change}%</span>
                                <span>Last Price: ${crypto.price}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-2xl font-bold text-red-500 mt-8">Losers</h3>
                    <ul>
                        {cryptoData.losers.map((crypto, index) => (
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
