
import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { useNavigate } from 'react-router-dom'; // Import the hook to handle navigation

const CryptoList = () => {
    // State to store the list of cryptocurrencies
    const [cryptos, setCryptos] = useState([]);
    // State to manage the loading status
    const [loading, setLoading] = useState(true);
    // State to handle any errors that occur during data fetching
    const [error, setError] = useState(null);
    // Base URL for the API, sourced from environment variables
    const API_URL = process.env.REACT_APP_API_URL;
    // Hook to handle navigation programmatically
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch the list of cryptocurrencies from the API
        const fetchCryptos = async () => {
            try {
                // Send a GET request to fetch all cryptocurrencies
                const response = await fetch(`${API_URL}/api/crypto/all`);
                // Check if the response is OK (status in the range 200-299)
                if (!response.ok) {
                    throw new Error(`Error fetching crypto data: ${response.statusText}`);
                }
                // Parse the response data as JSON
                const data = await response.json();
                // Update the state with the fetched data
                setCryptos(data);
                // Set loading to false as the data has been successfully fetched
                setLoading(false);
            } catch (error) {
                // Log the error and update the error state
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                // Stop the loading process
                setLoading(false);
            }
        };

        // Call the function to fetch cryptocurrencies
        fetchCryptos();
    }, [API_URL]); // Re-run the effect if the API_URL changes

    // If the data is still loading, display a loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If there was an error during data fetching, display the error message
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 pb-8 pt-16">
            <div className="w-full text-center mb-8">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
                    Available Cryptocurrencies
                </h2>
            </div>
            <ul className="space-y-6">
                {/* Map through the list of cryptocurrencies and render each one */}
                {cryptos.map(crypto => (
                    <li key={crypto.id} className="border p-4 rounded shadow hover:bg-gray-100 transition flex flex-col items-start">
                        <div className="flex items-center mb-4">
                            {/* Display the cryptocurrency's logo if available, else show a placeholder */}
                            {crypto.logo ? (
                                <img src={crypto.logo} alt={`${crypto.id} logo`} className="w-10 h-10 mr-4" />
                            ) : (
                                <div className="w-10 h-10 mr-4 bg-gray-300 rounded-full" />
                            )}
                            {/* Display the cryptocurrency's name and current price */}
                            <label className="text-blue-500 font-semibold flex-1">
                                {crypto.name}: {crypto.price} USD
                            </label>
                        </div>
                        {/* Button to navigate to the crypto detail page with a graph */}
                        <button onClick={() => navigate(`/crypto/${crypto.id}?showGraph=true`)} className="custom-button mb-2">
                            Show Graph
                        </button>
                        <div>
                            {/* Display the cryptocurrency's name and summary or a placeholder if not available */}
                            <span className="font-semibold">{crypto.name} Details:</span>
                            <p className="text-gray-700">{crypto.summary || 'No description available.'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList; // Export the component for use in other parts of the application