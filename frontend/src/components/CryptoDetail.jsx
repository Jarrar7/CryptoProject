import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LiveChart from './LiveChart'; // Import the LiveChart component
import Header from './Header'; // Import the Header component
const API_URL = process.env.REACT_APP_API_URL;


const CryptoDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cryptoInfo, setCryptoInfo] = useState(null);

    useEffect(() => {
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
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <Header /> {/* Add the Header component */}
            <div className="bg-gray-100 min-h-screen p-8">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">{cryptoInfo.name}</h1>
                    <div className="flex justify-center items-center mb-6">
                        <img src={cryptoInfo.logo} alt={`${cryptoInfo.name} logo`} className="w-16 h-16 mr-4" />
                        <a href={cryptoInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-lg">Official Website</a>
                    </div>
                    <LiveChart symbol={id} /> {/* Use the LiveChart component */}
                </div>
            </div>
        </div>
    );
};

export default CryptoDetail;
