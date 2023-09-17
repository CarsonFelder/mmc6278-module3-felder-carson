require('dotenv').config();
const express = require('express');
const app = express();

// Import the getCityInfo and getJobs functions from util.js
const { getCityInfo, getJobs } = require('./util');

// Serve the public folder as static files
app.use(express.static('public'));

// Define a GET route for city data and jobs
app.get('/api/city/:city', async (req, res) => {
  try {
    const city = req.params.city;

    // Call getCityInfo and getJobs functions
    const cityInfo = await getCityInfo(city);
    const jobs = await getJobs(city);

    // Check if cityInfo and jobs are found
    if (!cityInfo || !jobs) {
      return res.status(404).json({ error: 'City info or jobs not found' });
    }

    // Send the data as a JSON response
    res.json({ cityInfo, jobs });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;