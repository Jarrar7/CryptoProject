// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
// import ThemeToggle from './components/ThemeToggle'; // הסר את הייבוא של ThemeToggle
import Login from './components/Login';
import Signup from './components/Signup';
import CryptoList from './components/CryptoList';
import CryptoDetail from './components/CryptoDetail';
import TrendsAnalysis from './components/TrendsAnalysis';
import CustomAlerts from './components/CustomAlerts'; // וודא שהיבוא נכון
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoNews from './components/CryptoNews';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <CryptoList />
              </>
            }
          />
          <Route path="/crypto/:id" element={<CryptoDetail />} />
          <Route path="/trends" element={<TrendsAnalysis />} />
          <Route path="/alerts" element={<CustomAlerts />} /> {/* הוסף נתיב ל CustomAlerts */}
          <Route path="/crypto-news" element={<CryptoNews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
