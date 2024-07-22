import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoCard = ({ data }) => {
    const chartData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [
            {
                label: `${data.name} (${data.symbol}) Price`,
                data: [data.price - 1000, data.price - 500, data.price, data.price + 500, data.price - 200],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <div className="crypto-card p-4 border rounded shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{data.name} ({data.symbol})</h3>
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">Price: ${data.price}</p>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Change: {data.change}%</p>
            <Line data={chartData} />
        </div>
    );
};

export default CryptoCard;
