import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LiveChart from './LiveChart'; // Import the LiveChart component

const CryptoDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cryptoInfo, setCryptoInfo] = useState(null);

    useEffect(() => {
        const fetchCryptoInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/crypto/${id}`);
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
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold mb-4">{cryptoInfo.name}</h1>
                <p className="mb-4">{cryptoInfo.summary}</p>
                <a href={cryptoInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-6 block">Official Website</a>
                <LiveChart symbol={id} /> {/* Use the LiveChart component */}
            </div>
        </div>
    );
};

export default CryptoDetail;
