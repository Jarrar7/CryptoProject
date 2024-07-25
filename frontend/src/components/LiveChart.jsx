import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const LiveChart = ({ symbol }) => {
    const [labels, setLabels] = useState([]);
    const [dataPoints, setDataPoints] = useState([]);
    const socket = useRef(null);
    const maxPoints = 60;

    const logos = {
        BTC: 'https://res.coinpaper.com/coinpaper/bitcoin_btc_logo_62c59b827e.png', // Replace with actual paths
        ETH: 'https://res.coinpaper.com/coinpaper/ethereum_eth_logo_e69b1c2368.png', // Replace with actual paths
        SHIB: 'https://res.coinpaper.com/coinpaper/shiba_inu_shib_logo_a8ec09a691.png',
        LINK: 'https://res.coinpaper.com/coinpaper/chainlink_link_logo_26ead02910.png',
        BNB: 'https://res.coinpaper.com/coinpaper/bnb_bnb_logo_a2a64c3335.png',
        DOGE: 'https://res.coinpaper.com/coinpaper/dogecoin_doge_logo_f18d59aae4.png',
        ADA: 'https://res.coinpaper.com/coinpaper/cardano_ada_logo_d684df0304.png'
        // Add other logos here...
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const updateChart = useCallback((price) => {
        setDataPoints((prevDataPoints) => {
            const updatedDataPoints = [...prevDataPoints, price];
            if (updatedDataPoints.length > maxPoints) {
                updatedDataPoints.shift();
            }
            console.log('Updated Data Points:', updatedDataPoints);
            return updatedDataPoints;
        });
        setLabels((prevLabels) => {
            const updatedLabels = [...prevLabels, formatTime(new Date().getTime())];
            if (updatedLabels.length > maxPoints) {
                updatedLabels.shift();
            }
            console.log('Updated Labels:', updatedLabels);
            return updatedLabels;
        });
    }, [maxPoints]);

    useEffect(() => {
        // Initialize labels based on the current time
        const initTime = new Date().getTime();
        const initialLabels = Array.from({ length: maxPoints }, (_, i) =>
            formatTime(initTime + i * 60000) // Update every minute
        );
        setLabels(initialLabels);

        // Set up WebSocket connection
        socket.current = new WebSocket('wss://mtickers.mtw-testnet.com');

        socket.current.onopen = () => {
            console.log('WebSocket connection opened');
            // Subscribe to the specific symbol data
            socket.current.send(JSON.stringify({
                type: 'subscribe',
                symbol: symbol
            }));
        };

        socket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('Received data:', data);

            if (data.hasOwnProperty(symbol)) {
                const price = parseFloat(data[symbol].p);
                updateChart(price);
            } else {
                console.log(`Data does not contain symbol ${symbol}`, data);
            }
        };

        socket.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [symbol, updateChart, maxPoints]);

    const chartData = {
        labels,
        datasets: [
            {
                label: `${symbol} Price`,
                data: dataPoints,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.4, // Bezier curve for smooth lines
            },
        ],
    };

    console.log('Chart Data:', chartData);

    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute',
                    tooltipFormat: 'HH:mm',
                },
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: true,
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgba(75, 192, 192, 1)',
                },
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <div className="flex items-center mb-4">
                <img src={logos[symbol]} alt={`${symbol} logo`} className="w-10 h-10 mr-4" />
                <h2 className="text-xl font-semibold">{symbol} Live Chart</h2>
            </div>
            <div className="relative">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default LiveChart;
