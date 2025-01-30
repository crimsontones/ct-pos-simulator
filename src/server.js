require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 8080;

// CORS middleware to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend port
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-CleverTap-Account-Id', 'X-CleverTap-Passcode']
}));
app.use(express.json()); // For parsing application/json

const CLEVERTAP_ACCOUNT_ID = '696-K96-ZW7Z';
const CLEVERTAP_PASSCODE = 'WRC-RUY-SSEL';
const BASE_URL = 'https://api.clevertap.com/1/';

// Endpoint to check profile
app.get('/proxy/profile', async (req, res) => {
    const identity = req.query.identity;
    const url = `${BASE_URL}profile.json?identity=${identity}`;
    const headers = {
        'Content-Type': 'application/json',
        'X-CleverTap-Account-Id': CLEVERTAP_ACCOUNT_ID,
        'X-CleverTap-Passcode': CLEVERTAP_PASSCODE
    };

    try {
        const response = await axios.get(url, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Endpoint to create profile
app.post('/proxy/profile', async (req, res) => {
    const payload = req.body;

    const url = `${BASE_URL}upload`;
    const headers = {
        'Content-Type': 'application/json',
        'X-CleverTap-Account-Id': CLEVERTAP_ACCOUNT_ID,
        'X-CleverTap-Passcode': CLEVERTAP_PASSCODE
    };

    try {
        const response = await axios.post(url, payload, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Failed to create profile' });
    }
});

// Endpoint to append purchase
app.post('/proxy/purchase', async (req, res) => {
    const payload = req.body;

    const url = `${BASE_URL}upload`;
    const headers = {
        'Content-Type': 'application/json',
        'X-CleverTap-Account-Id': CLEVERTAP_ACCOUNT_ID,
        'X-CleverTap-Passcode': CLEVERTAP_PASSCODE
    };

    try {
        const response = await axios.post(url, payload, { headers });
        res.json(response.data);
    } catch (error) {
        console.error('Error appending purchase:', error);
        res.status(500).json({ error: 'Failed to append purchase' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});