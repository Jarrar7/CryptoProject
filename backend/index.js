const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

let cryptoPrices = {};

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
