import React from 'react';

const CryptoCard = ({ data }) => {
    console.log('Data in CryptoCard:', data);

    return (
        <div className="crypto-card p-4 border rounded shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{data.name} ({data.symbol})</h3>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">Price: ${data.price}</p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Change: {data.change}%</p>
        </div>
    );
};

export default CryptoCard;
