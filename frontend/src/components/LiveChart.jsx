import React, { useEffect, useState, useCallback } from 'react'; // Import necessary React hooks
import { Line } from 'react-chartjs-2'; // Import the Line chart component from react-chartjs-2
import 'chart.js/auto'; // Auto-import Chart.js components
import 'chartjs-adapter-date-fns'; // Import the date adapter for date formatting

// Base URL for the API, sourced from environment variables
const API_URL = process.env.REACT_APP_API_URL;

const LiveChart = ({ symbol }) => {
    // State to store the data for the chart, initialized with empty labels and dataset
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: `${symbol} Price`, // Label for the dataset
            data: [], // Initial empty data array
            fill: false, // Disable fill under the line
            borderColor: '#4A90E2', // Line color
            borderWidth: 2, // Line width
            tension: 0.4, // Line curve tension
            pointRadius: 0, // Disable point markers
        }]
    });
    // State to track the selected interval for historical data (1 day, 30 days, or 1 year)
    const [interval, setInterval] = useState('1');
    // State to handle any errors that occur during data fetching
    const [error, setError] = useState(null);

    // Function to fetch historical data from the API, memoized with useCallback
    const fetchHistoricalData = useCallback(async () => {
        try {
            // Send a GET request to fetch historical data for the specified symbol and interval
            const response = await fetch(`${API_URL}/api/crypto/historical/${symbol}/${interval}`);
            const data = await response.json();
            console.log('Fetched Historical Data:', data); // Debug log

            if (!data.historicalData) {
                throw new Error('Unexpected response structure'); // Handle unexpected response structure
            }

            // Map through the fetched data to create labels and prices arrays for the chart
            const labels = data.historicalData.map(point => new Date(point.timestamp));
            const prices = data.historicalData.map(point => point.close);

            // Update the chart data state with the new labels and prices
            setChartData({
                labels,
                datasets: [{
                    label: `${symbol} Price`,
                    data: prices,
                    fill: false,
                    borderColor: '#4A90E2',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                }]
            });
        } catch (error) {
            console.error('Error fetching historical data:', error); // Log the error
            setError(error.message); // Set the error message in the state
        }
    }, [symbol, interval]); // Depend on symbol and interval to refetch data when they change

    // useEffect hook to fetch data when the component mounts or when the symbol or interval changes
    useEffect(() => {
        if (symbol) {
            fetchHistoricalData(); // Fetch the historical data
        }
    }, [symbol, fetchHistoricalData]);

    // Configuration options for the chart
    const chartOptions = {
        scales: {
            x: {
                type: 'time', // Use time scale for the x-axis
                time: {
                    unit: interval === '1' ? 'day' : interval === '30' ? 'day' : 'month', // Adjust time unit based on interval
                    tooltipFormat: 'MM/dd/yyyy', // Tooltip format for the date
                },
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)', // Grid line color
                },
                ticks: {
                    color: '#666666', // Tick color
                },
            },
            y: {
                beginAtZero: false, // Do not start y-axis at zero
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)', // Grid line color
                },
                ticks: {
                    color: '#666666', // Tick color
                },
            },
        },
        plugins: {
            legend: {
                display: true, // Display the legend
                labels: {
                    color: '#333333', // Legend label color
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ` ${context.dataset.label}: ${context.formattedValue}`; // Tooltip label format
                    }
                },
                backgroundColor: '#ffffff', // Tooltip background color
                titleColor: '#4A90E2', // Tooltip title color
                bodyColor: '#333333', // Tooltip body color
                borderColor: '#cccccc', // Tooltip border color
                borderWidth: 1, // Tooltip border width
            }
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <div className="flex justify-end mb-4">
                {/* Dropdown to select the interval for the chart */}
                <select value={interval} onChange={e => setInterval(e.target.value)} className="border p-2 rounded">
                    <option value="1">1 Day</option>
                    <option value="30">30 Days</option>
                    <option value="365">1 Year</option>
                </select>
            </div>
            {error ? (
                <p className="text-red-500">{error}</p> // Display error message if there is an error
            ) : (
                <div className="relative">
                    <Line data={chartData} options={chartOptions} /> {/* Render the Line chart */}
                </div>
            )}
        </div>
    );
};

export default LiveChart; // Export the component for use in other parts of the application
