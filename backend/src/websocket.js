const WebSocket = require('ws');

const livePrices = {};
const socket = new WebSocket('wss://mtickers.mtw-testnet.com/');

socket.onopen = () => {
    console.log('WebSocket connection opened');
};

socket.onmessage = (e) => {
    console.log('WebSocket message received:', e.data);
    try {
        const data = JSON.parse(e.data);
        console.log('Parsed data:', data);

        Object.keys(data).forEach(key => {
            livePrices[key] = data[key].p;
        });

        console.log('Updated livePrices:', livePrices);
    } catch (error) {
        console.error('Error parsing message data:', error);
    }
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

const getCryptoData = () => livePrices;

module.exports = { getCryptoData };
