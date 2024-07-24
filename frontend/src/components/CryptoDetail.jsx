import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CryptoDetail = () => {
    const { id } = useParams();
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/crypto/${id}/chart`)
            .then(response => response.json())
            .then(data => {
                const chartData = {
                    labels: data.map(point => new Date(point.time).toLocaleTimeString()),
                    datasets: [{
                        label: `${id} Price`,
                        data: data.map(point => point.price),
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.1
                    }]
                };
                setChartData(chartData);
            })
            .catch(error => console.error('Error fetching chart data:', error));
    }, [id]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">{id} - 1 Day Chart</h2>
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default CryptoDetail;
