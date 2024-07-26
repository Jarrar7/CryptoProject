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
            borderColor: '#4A90E2', // Updated line color
            borderWidth: 2,
            tension: 0.4, // Smooth the line
            pointRadius: 0, // Remove the dots
        }]
    });

    const fetchHistoricalData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/crypto/historical/${symbol}`);
            const data = await response.json();
            console.log('Fetched Historical Data:', data);

            const labels = data.historicalData.map(point => new Date(point.timestamp));
            const prices = data.historicalData.map(point => point.close);

            setChartData({
                labels,
                datasets: [{
                    label: `${symbol} Price`,
                    data: prices,
                    fill: false,
                    borderColor: '#4A90E2', // Updated line color
                    borderWidth: 2,
                    tension: 0.4, // Smooth the line
                    pointRadius: 0, // Remove the dots
                }]
            });
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    }, [symbol]);

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
                    unit: 'day', // Change x-axis to date
                    tooltipFormat: 'MM/dd/yyyy',
                },
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#666666', // Updated x-axis tick color
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#666666', // Updated y-axis tick color
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333333', // Updated legend color
                    font: {
                        size: 14, // Updated legend font size
                        weight: 'bold', // Updated legend font weight
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return ` ${context.dataset.label}: ${context.formattedValue}`;
                    }
                },
                backgroundColor: '#ffffff', // Updated tooltip background color
                titleColor: '#4A90E2', // Updated tooltip title color
                bodyColor: '#333333', // Updated tooltip body color
                borderColor: '#cccccc', // Updated tooltip border color
                borderWidth: 1, // Updated tooltip border width
            }
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <div className="relative">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default LiveChart;
