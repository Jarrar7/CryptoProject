const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;

        console.log('Fetching cryptocurrency prices...');
        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        const data = await response.json();
        console.log('Fetched cryptocurrency prices:', JSON.stringify(data, null, 2)); // Log the data to see its structure

        console.log('Fetching logos and additional information...');
        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        const logos = await logoResponse.json();
        console.log('Fetched logos and additional information:', JSON.stringify(logos, null, 2)); // Log the logos to see its structure

        // Map the logos and additional information to the cryptocurrencies
        const logoMap = {
            ...logos,
            SHIB: {
                image: 'https://res.coinpaper.com/coinpaper/shiba_inu_shib_logo_a8ec09a691.png', // Add SHIB logo URL
                name: 'Shiba Inu',
                website: 'https://shibatoken.com/',
                summary: 'Shiba Inu is a decentralized meme token that grew into a vibrant ecosystem.',
            },
            LINK: {
                image: 'https://res.coinpaper.com/coinpaper/chainlink_link_logo_26ead02910.png', // Add LINK logo URL
                name: 'Chainlink',
                website: 'https://chain.link/',
                summary: 'Chainlink is a decentralized oracle network that enables smart contracts to securely connect to external data sources, APIs, and payment systems.',
            },
        };

        // Convert the object into an array of objects
        const mergedData = Object.keys(data).map(key => ({
            id: key,
            price: data[key].p,
            logo: logoMap[key]?.image || null,
            name: logoMap[key]?.name || 'N/A',
            website: logoMap[key]?.website || 'N/A',
            summary: logoMap[key]?.summary || 'No summary available',
        }));

        res.json(mergedData);
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
    }
});

router.get('/:id/chart', async (req, res) => {
    const { id } = req.params;
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://mtickers.mtw-testnet.com/tickers/${id}/chart/1d`);
        const data = await response.json();
        console.log('Fetched chart data:', JSON.stringify(data, null, 2)); // Log the data to see its structure
        res.json(data);
    } catch (error) {
        console.error(`Error fetching chart data for ${id}:`, error);
        res.status(500).json({ error: `Failed to fetch chart data for ${id}` });
    }
});

module.exports = router;
