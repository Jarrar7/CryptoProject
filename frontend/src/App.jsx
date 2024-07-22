import React, { useState, useEffect } from 'react';
import Header from './Header';
import MarketSummary from './MarketSummary';
import ThemeToggle from './ThemeToggle';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from backend...');
        const response = await fetch('http://localhost:3001/api/prices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Data from backend:', result); 
        const formattedData = Object.keys(result).map(symbol => {
          console.log('Symbol:', symbol, 'Data:', result[symbol]);
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

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Header theme={theme} setTheme={setTheme} />
      <div className="flex justify-end p-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <MarketSummary cryptoData={cryptoData} />
    </div>
  );
}

export default App;
