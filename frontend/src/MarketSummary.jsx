import React from 'react';
import CryptoCard from './CryptoCard';

const MarketSummary = () => {
    const cryptoData = [
        { name: 'Bitcoin', symbol: 'BTC', price: 30000, change: 2 },
        { name: 'Ethereum', symbol: 'ETH', price: 2000, change: 5 },
        { name: 'Ripple', symbol: 'XRP', price: 0.60, change: 3 },
        { name: 'Litecoin', symbol: 'LTC', price: 150, change: 1.2 },
        { name: 'Cardano', symbol: 'ADA', price: 1.20, change: 2.5 },
        { name: 'Polkadot', symbol: 'DOT', price: 25, change: 4 },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Market Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cryptoData.map((crypto, index) => (
                    <CryptoCard key={index} data={crypto} />
                ))}
            </div>
        </div>
    );
};

export default MarketSummary;
