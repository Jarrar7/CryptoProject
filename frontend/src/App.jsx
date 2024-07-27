import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Signup from './components/Signup'; // Import the Signup component
import CryptoList from './components/CryptoList';
import CryptoDetail from './components/CryptoDetail';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} /> {/* Add the register route */}
          <Route path="/home" element={
            <>
              <Header />
              <div className="flex justify-end p-4">
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
              <CryptoList />
            </>
          } />
          <Route path="/crypto/:id" element={<CryptoDetail />} />
          <Route path="/trends" element={<div>Trends Analysis Page</div>} />
          <Route path="/market-sentiment" element={<div>Market Sentiment Page</div>} />
          <Route path="/alerts" element={<div>Custom Alerts Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </div>
      <script src="https://morethanwallet.com/appstore/index.js"></script>
    </Router>
  );
}

export default App;
