import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import LiveChart from './LiveChart';
import Header from './Header';
const API_URL = process.env.REACT_APP_API_URL;

const CryptoDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cryptoInfo, setCryptoInfo] = useState(null);
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setShowGraph(queryParams.get('showGraph') === 'true');

        const fetchCryptoInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/api/crypto/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCryptoInfo(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCryptoInfo();
    }, [id, location.search]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <Header />
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">{cryptoInfo.name}</h1>
                    <div className="flex justify-center items-center mb-6">
                        <img src={cryptoInfo.logo} alt={`${cryptoInfo.name} logo`} className="w-16 h-16 mr-4" />
                        <a href={cryptoInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline text-lg">Official Website</a>
                    </div>
                    {showGraph && <LiveChart symbol={id} />}
                </div>
            </div>
        </div>
    );
};

export default CryptoDetail;
