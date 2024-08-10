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
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800">
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {cryptoData.gainers.map((crypto, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{crypto.symbol}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 text-center ">{crypto.change}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">${crypto.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
                    <h3 className="text-2xl font-bold text-red-500 mt-8">Losers</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800">
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {cryptoData.losers.map((crypto, index) => (
                             <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{crypto.symbol}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 text-center">{crypto.change}%</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center ">${crypto.price}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
     </div>
    </div>
</div>
    );
};

export default TrendsAnalysis;
