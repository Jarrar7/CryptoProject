import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const LiveChart = ({ symbol }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: `${symbol} Price`,
            data: [],
            fill: false,
            borderColor: '#4A90E2',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
        }]
    });
    const [interval, setInterval] = useState('1');
    const [error, setError] = useState(null);

    const fetchHistoricalData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/crypto/historical/${symbol}/${interval}`);
            const data = await response.json();
            console.log('Fetched Historical Data:', data);

            if (!data.historicalData) {
                throw new Error('Unexpected response structure');
            }

            const labels = data.historicalData.map(point => new Date(point.timestamp));
            const prices = data.historicalData.map(point => point.close);

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
            console.error('Error fetching historical data:', error);
            setError(error.message);
        }
    }, [symbol, interval]);

    useEffect(() => {
        if (symbol) {
            fetchHistoricalData();
        }
    }, [symbol, fetchHistoricalData]);

    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: interval === '1' ? 'day' : interval === '30' ? 'day' : 'month',
                    tooltipFormat: 'MM/dd/yyyy',
                },
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#666666',
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#666666',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ` ${context.dataset.label}: ${context.formattedValue}`;
                    }
                },
                backgroundColor: '#ffffff',
                titleColor: '#4A90E2',
                bodyColor: '#333333',
                borderColor: '#cccccc',
                borderWidth: 1,
            }
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <div className="flex justify-end mb-4">
                <select value={interval} onChange={e => setInterval(e.target.value)} className="border p-2 rounded">
                    <option value="1">1 Day</option>
                    <option value="30">30 Days</option>
                    <option value="365">1 Year</option>
                </select>
            </div>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="relative">
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default LiveChart;
