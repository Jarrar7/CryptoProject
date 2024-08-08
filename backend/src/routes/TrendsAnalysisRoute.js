const express = require('express');
const router = express.Router();
const { getCryptoData } = require('../websocket');

// Endpoint to get the trends analysis data
router.get('/', (req, res) => {
    const cryptoData = getCryptoData();
    console.log('Crypto data:', cryptoData);

    const processedData = Object.entries(cryptoData).map(([symbol, price]) => ({
        symbol,
        change: Math.random() * 10 - 5,  // Simulating change percentage for testing
        price: parseFloat(price),
    })).sort((a, b) => b.change - a.change);

    console.log('Processed data:', processedData);
    res.json(processedData);
});

module.exports = router;
