// backend/src/routes/TrendsAnalysisRoute.js

const express = require('express');
const router = express.Router();
const { getCryptoData } = require('../websocket');

// Endpoint to get the trends analysis data
router.get('/', (req, res) => {
    const cryptoData = getCryptoData();
    const processedData = Object.entries(cryptoData).map(([symbol, info]) => ({
        symbol,
        change: parseFloat(info.c),
        price: parseFloat(info.p),
    })).sort((a, b) => b.change - a.change);

    res.json(processedData);
});

module.exports = router;
