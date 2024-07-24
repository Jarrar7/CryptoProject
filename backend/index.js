const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

let cryptoPrices = {};

const coinNameMap = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  DOGE: 'dogecoin',
  SHIB: 'shiba-inu',
  ADA: 'cardano',
  LINK: 'chainlink'
};

const socket = new WebSocket("wss://mtickers.mtw-testnet.com/");

socket.onopen = () => {
  console.log('WebSocket connection opened');
};

socket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log('Received data from WebSocket:', data);
  // Update the prices based on the received data
  cryptoPrices = {
    ...cryptoPrices,
    ...data
  };
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

app.get('/api/prices', (req, res) => {
  res.json(cryptoPrices);
});

app.get('/api/historical/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const coinName = coinNameMap[symbol.toUpperCase()];
  if (!coinName) {
    return res.status(400).json({ error: `Unsupported symbol: ${symbol}` });
  }

  try {
    const response = await axios.get(`https://mdata.mtw-testnet.com/item/${coinName}/30`);
    console.log(`Response for ${symbol}:`, response.data);

    
    if (Array.isArray(response.data)) {
      const data = response.data.map(item => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[4],
      }));
      res.json(data);
    } else {
      
      console.error(`Unexpected response structure for ${symbol}:`, response.data);
      res.status(500).json({ error: 'Unexpected response structure' });
    }
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
