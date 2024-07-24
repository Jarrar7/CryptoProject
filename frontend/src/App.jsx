import React, { useState, useEffect } from 'react';
import Header from './Header';
import MarketSummary from './MarketSummary';
import ThemeToggle from './ThemeToggle';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [cryptoData, setCryptoData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        console.log('Fetching data from backend...');
        const response = await fetch('http://localhost:3001/api/prices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Data from backend:', result);
        const formattedData = Object.keys(result).map(symbol => {
          return {
            name: symbol,
            symbol: symbol,
            price: parseFloat(result[symbol].p),
            change: parseFloat(result[symbol].c)
          };
        });
        console.log('Formatted Data:', formattedData);
        setCryptoData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCurrentData();
    const interval = setInterval(fetchCurrentData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const data = {};
        const symbols = ['BTC', 'ETH', 'BNB', 'DOGE', 'SHIB', 'ADA', 'LINK'];
        for (let symbol of symbols) {
          const response = await fetch(`http://localhost:3001/api/historical/${symbol}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch historical data for ${symbol}`);
          }
          const result = await response.json();
          console.log(`Historical data for ${symbol}:`, result);
          data[symbol] = result;
        }
        console.log('Historical Data:', data);
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, []);

  return (
    <div className="App">
      <Header theme={theme} setTheme={setTheme} />
      <div className="flex justify-end p-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <MarketSummary cryptoData={cryptoData} historicalData={historicalData} />
    </div>
  );
}

export default App;
