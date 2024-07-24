import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CryptoList = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/crypto/all');
                if (!response.ok) {
                    throw new Error(`Error fetching crypto data: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched cryptos with additional info:', data);

                // Check if data is an array
                if (Array.isArray(data)) {
                    setCryptos(data);
                } else {
                    console.error('Data is not an array:', data);
                    throw new Error('Data is not an array');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchCryptos();
    }, []);

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
                            <Link to={`/crypto/${crypto.id}`} className="text-blue-500 flex-1">
                                <span className="font-semibold">{crypto.id}</span>: {crypto.price} USD
                            </Link>
                        </div>
                        <div className="flex flex-col ml-14">
                            <span className="font-semibold">{crypto.name}</span>
                            <a href={crypto.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                                {crypto.website}
                            </a>
                            <p className="mt-2 text-gray-700">{crypto.summary}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;
