import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
const API_URL = process.env.REACT_APP_API_URL;


const CustomAlerts = () => {
    const [cryptoData, setCryptoData] = useState({});
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [alertPrice, setAlertPrice] = useState('');
    const [alertType, setAlertType] = useState('above');
    const [activeAlerts, setActiveAlerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/CustomAlerts`);
                const data = await response.json();
                console.log('Fetched crypto data:', data); // Debug log
                setCryptoData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(interval);
    }, []);

    // Function to create a new alert
    const createAlert = () => {
        if (selectedCrypto && alertPrice && alertType) {
            const newAlert = {
                crypto: selectedCrypto,
                price: parseFloat(alertPrice),
                type: alertType,
            };

            setActiveAlerts([...activeAlerts, newAlert]);
        }
    };

    // Function to delete an alert, memoized with useCallback
    const deleteAlert = useCallback((index) => {
        setActiveAlerts((alerts) => alerts.filter((_, i) => i !== index));
    }, []);

    // Check alerts each time cryptoData changes
    useEffect(() => {
        activeAlerts.forEach((alert, index) => {
            const currentPrice = parseFloat(cryptoData[alert.crypto]?.p);

            if (
                (alert.type === 'above' && currentPrice > alert.price) ||
                (alert.type === 'under' && currentPrice < alert.price) ||
                (alert.type === 'reach' && currentPrice === alert.price)
            ) {
                window.alert(`Alert! ${alert.crypto} has ${alert.type} ${alert.price}`);
                deleteAlert(index);
            }
        });
    }, [cryptoData, activeAlerts, deleteAlert]);

    return (
        <div>
            <Header /> {/* Add the Header component */}
            <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Create a Price Alert</h2>
                <div className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="crypto-select" className="block text-lg font-semibold">Choose a cryptocurrency:</label>
                        <select
                            id="crypto-select"
                            className="crypto-combobox"
                            value={selectedCrypto}
                            onChange={(e) => setSelectedCrypto(e.target.value)}
                        >
                            <option value="">Select a crypto</option>
                            {Object.keys(cryptoData).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alert-price" className="block text-lg font-semibold">Alert Price ($):</label>
                        <input
                            type="number"
                            id="alert-price"
                            className="price-input"
                            value={alertPrice}
                            onChange={(e) => setAlertPrice(e.target.value)}
                            placeholder="Enter price for alert"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="alert-type" className="block text-lg font-semibold">Alert Type:</label>
                        <select
                            id="alert-type"
                            className="crypto-combobox"
                            value={alertType}
                            onChange={(e) => setAlertType(e.target.value)}
                        >
                            <option value="above">Above the Price</option>
                            <option value="under">Under the Price</option>
                            <option value="reach">Reach the Price</option>
                        </select>
                    </div>
                    <button
                        className="create-alert-button"
                        onClick={createAlert}
                    >
                        Create Alert
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Active Alerts</h3>
                    <ul className="space-y-4">
                        {activeAlerts.map((alert, index) => (
                            <li key={index} className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 flex justify-between items-center">
                                <span>{alert.crypto} - {alert.type} - ${alert.price}</span>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => deleteAlert(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomAlerts;
