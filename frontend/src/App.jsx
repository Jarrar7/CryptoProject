import React, { useState, useEffect } from 'react';
import Header from './Header';
import MarketSummary from './MarketSummary';
import ThemeToggle from './ThemeToggle';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="App">
      <Header />
      <div className="flex justify-end p-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      <MarketSummary />
    </div>
  );
}

export default App;
