const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Define your API routes here
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;