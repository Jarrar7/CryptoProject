import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CryptoList = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await fetch(`${API_URL}/api/crypto/all`);
                if (!response.ok) {
                    throw new Error(`Error fetching crypto data: ${response.statusText}`);
                }
                const data = await response.json();
                setCryptos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchCryptos();
    }, [API_URL]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 pb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Available Cryptocurrencies</h2>
            <ul className="space-y-6">
                {cryptos.map(crypto => (
                    <li key={crypto.id} className="border p-4 rounded shadow hover:bg-gray-100 transition flex flex-col items-start">
                        <div className="flex items-center mb-4">
                            {crypto.logo ? (
                                <img src={crypto.logo} alt={`${crypto.id} logo`} className="w-10 h-10 mr-4" />
                            ) : (
                                <div className="w-10 h-10 mr-4 bg-gray-300 rounded-full" />
                            )}
                            <label className="text-blue-500 font-semibold flex-1">
                                {crypto.name}: {crypto.price} USD
                            </label>
                        </div>
                        <button onClick={() => navigate(`/crypto/${crypto.id}?showGraph=true`)} className="custom-button mb-2">
                            Show Graph
                        </button>
                        <div>
                            <span className="font-semibold">{crypto.name} Details:</span>
                            <p className="text-gray-700">{crypto.summary || 'No description available.'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;