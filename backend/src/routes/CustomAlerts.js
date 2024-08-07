// backend/src/routes/CustomAlertsRoute.js

const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

let cryptoData = {};

// Setup WebSocket connection
const socket = new WebSocket('wss://mtickers.mtw-testnet.com/');

socket.onopen = () => {
    console.log('WebSocket connection opened');
};

socket.onmessage = (e) => {
    try {
        const data = JSON.parse(e.data);
        //console.log('Received data:', data);

        // Store the data
        cryptoData = data;
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

// Endpoint to get the custom alerts data
router.get('/', (req, res) => {
    res.json(cryptoData);
});

module.exports = router;
