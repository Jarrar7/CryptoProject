const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        const data = await response.json();

        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        const logos = await logoResponse.json();

        const logoMap = {
            ...logos,
            SHIB: {
                image: 'https://res.coinpaper.com/coinpaper/shiba_inu_shib_logo_a8ec09a691.png',
                name: 'Shiba Inu',
                website: 'https://shibatoken.com/',
                summary: 'Shiba Inu is a decentralized meme token that grew into a vibrant ecosystem.',
            },
            LINK: {
                image: 'https://res.coinpaper.com/coinpaper/chainlink_link_logo_26ead02910.png',
                name: 'Chainlink',
                website: 'https://chain.link/',
                summary: 'Chainlink is a decentralized oracle network that enables smart contracts to securely connect to external data sources, APIs, and payment systems.',
            },
        };

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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching data for ${id}`);
    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch('https://mtickers.mtw-testnet.com/tickers/all');
        if (!response.ok) {
            console.error('Error fetching data from external API');
            throw new Error('Error fetching data from external API');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const logoResponse = await fetch('https://api.mtw-testnet.com/assets/all');
        if (!logoResponse.ok) {
            console.error('Error fetching logos from external API');
            throw new Error('Error fetching logos from external API');
        }
        const logos = await logoResponse.json();

        const logoMap = {
            ...logos,
            SHIB: {
                image: 'https://res.coinpaper.com/coinpaper/shiba_inu_shib_logo_a8ec09a691.png',
                name: 'Shiba Inu',
                website: 'https://shibatoken.com/',
                summary: 'Shiba Inu is a decentralized meme token that grew into a vibrant ecosystem.',
            },
            LINK: {
                image: 'https://res.coinpaper.com/coinpaper/chainlink_link_logo_26ead02910.png',
                name: 'Chainlink',
                website: 'https://chain.link/',
                summary: 'Chainlink is a decentralized oracle network that enables smart contracts to securely connect to external data sources, APIs, and payment systems.',
            },
        };

        const cryptoInfo = {
            id,
            price: data[id]?.p,
            logo: logoMap[id]?.image || null,
            name: logoMap[id]?.name || 'N/A',
            website: logoMap[id]?.website || 'N/A',
            summary: logoMap[id]?.summary || 'No summary available',
        };

        res.json(cryptoInfo);
    } catch (error) {
        console.error(`Error fetching data for ${id}:`, error);
        res.status(500).json({ error: `Failed to fetch data for ${id}` });
    }
});

module.exports = router;
