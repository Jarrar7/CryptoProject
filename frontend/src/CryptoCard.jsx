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

const CryptoCard = ({ data, historicalData }) => {
  console.log('Data in CryptoCard:', data);
  console.log('Historical Data in CryptoCard:', historicalData);

  const chartData = historicalData && historicalData.length > 0 ? {
    labels: historicalData.map(d => d.date),
    datasets: [
      {
        label: `${data.name} Opening Price`,
        data: historicalData.map(d => d.open),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: `${data.name} Closing Price`,
        data: historicalData.map(d => d.close),
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
      },
      {
        label: `${data.name} Highest Price`,
        data: historicalData.map(d => d.high),
        fill: false,
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
      },
      {
        label: `${data.name} Lowest Price`,
        data: historicalData.map(d => d.low),
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  } : null;

  return (
    <div className="crypto-card p-4 border rounded shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{data.name} ({data.symbol})</h3>
      <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">Price: ${data.price}</p>
      <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Change: {data.change}%</p>
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default CryptoCard;
