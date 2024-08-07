// backend/src/routes/CustomAlertsRoute.js

const express = require('express');
const router = express.Router();
const { getCryptoData } = require('../websocket');

// Endpoint to get the custom alerts data
router.get('/', (req, res) => {
    const cryptoData = getCryptoData();
    res.json(cryptoData);
});

module.exports = router;
