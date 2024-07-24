import React from 'react';
import CryptoCard from './CryptoCard';

const MarketSummary = ({ cryptoData, historicalData }) => {
  console.log('Crypto Data in MarketSummary:', cryptoData);
  console.log('Historical Data in MarketSummary:', historicalData);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Market Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptoData.length > 0 ? (
          cryptoData.map((crypto, index) => (
            <CryptoCard key={index} data={crypto} historicalData={historicalData[crypto.symbol]} />
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default MarketSummary;
